import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  state?: string;
  city?: string;
  phone?: string;
  crop_preferences?: string[];
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

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "http://localhost:8000";

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      if (!username || !password) {
        throw new Error("Username and password are required.");
      }

      const cleanUsername = String(username).trim();
      const cleanPassword = String(password).trim();

      if (!cleanUsername || !cleanPassword) {
        throw new Error("Username and password cannot be empty.");
      }

      console.log('Attempting login with:', { username: cleanUsername });

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
          errorMessage = loginResponse.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const loginData = await loginResponse.json();
      const accessToken = loginData.access_token;

      if (!accessToken) {
        throw new Error("No access token received from login.");
      }

      const userResponse = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user profile after successful token retrieval.");
      }

      const userData: User = await userResponse.json();

      setToken(accessToken);
      setUser(userData);
      localStorage.setItem("auth_token", accessToken);
      localStorage.setItem("auth_user", JSON.stringify(userData));
      
      console.log('Login successful:', userData);
    } catch (error) {
      console.error("Login process failed:", error);
      setToken(null);
      setUser(null);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      if (!data.username || !data.email || !data.password) {
        throw new Error("Username, email, and password are required for registration.");
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

      await login(data.username, data.password);
      console.log('Registration successful, user logged in.');
    } catch (error) {
      console.error("Registration process failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    console.log('User logged out.');
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