import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  state?: string;
  city?: string;
  phone?: string;
  crop_preferences?: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  state?: string;
  city?: string;
  phone?: string;
  crop_preferences?: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Backend base URL
  const API_URL = "http://localhost:8000";

  // Load from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // ---- Login ----
  const login = async (username: string, password: string) => {
    try {
      // Validate inputs
      if (!username || !password) {
        throw new Error("Username and password are required");
      }

      // Convert to string and trim to ensure we have valid string values
      const cleanUsername = String(username).trim();
      const cleanPassword = String(password).trim();

      if (!cleanUsername || !cleanPassword) {
        throw new Error("Username and password cannot be empty");
      }

      console.log('Attempting login with:', { username: cleanUsername });

      // Step 1: Get JWT token using form data
      const formData = new FormData();
      formData.append('username', cleanUsername);
      formData.append('password', cleanPassword);

      const loginResponse = await fetch(`${API_URL}/token`, {
        method: "POST",
        body: formData,
      });

      if (!loginResponse.ok) {
        const errorText = await loginResponse.text();
        let errorMessage = "Login failed";
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // If response isn't JSON, use status text
          errorMessage = loginResponse.statusText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const loginData = await loginResponse.json();
      const accessToken = loginData.access_token;

      if (!accessToken) {
        throw new Error("No access token received");
      }

      // Step 2: Fetch user profile
      const userResponse = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const userData: User = await userResponse.json();

      // Save state
      setToken(accessToken);
      setUser(userData);

      // Persist in localStorage
      localStorage.setItem("auth_token", accessToken);
      localStorage.setItem("auth_user", JSON.stringify(userData));
      
      console.log('Login successful:', userData);
    } catch (error) {
      console.error("Login failed:", error);
      // Clear any partial state
      setToken(null);
      setUser(null);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      throw error;
    }
  };

  // ---- Register ----
  const register = async (data: RegisterData) => {
    try {
      // Validate required fields
      if (!data.username || !data.email || !data.password) {
        throw new Error("Username, email, and password are required");
      }

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "Registration failed";
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.detail || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      // If registration succeeds, auto-login the user
      await login(data.username, data.password);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // ---- Logout ----
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};