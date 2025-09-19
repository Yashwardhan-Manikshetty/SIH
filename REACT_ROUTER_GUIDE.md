# React Router Guide for AgrowAI

This guide explains how React Router is implemented in the AgrowAI project and how to use it effectively.

## Overview

React Router DOM v6 is used for client-side routing in this React application. It provides declarative routing with components and hooks for navigation.

## Project Structure

```
src/
├── App.tsx                 # Main router configuration
├── components/
│   ├── Layout.tsx          # Layout wrapper with navigation
│   ├── Navigation.tsx      # Navigation component
│   └── RouterExamples.tsx # Examples of router usage
└── pages/
    ├── LandingPage.tsx     # Landing page route
    ├── RegionSelection.tsx # Region selection route
    ├── CropSelection.tsx   # Crop selection route
    ├── Dashboard.tsx       # Main dashboard route
    ├── DiseaseDetection.tsx# Disease detection route
    ├── Chatbot.tsx         # Chatbot route
    ├── Settings.tsx        # Settings route
    ├── CropPrices.tsx      # Crop prices route
    └── NotFound.tsx        # 404 page
```

## Router Configuration

### App.tsx
The main router configuration uses `BrowserRouter` with nested routes:

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<Layout />}>
        <Route path="region-selection" element={<RegionSelection />} />
        <Route path="crop-selection" element={<CropSelection />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="disease-detection" element={<DiseaseDetection />} />
        <Route path="chatbot" element={<Chatbot />} />
        <Route path="settings" element={<Settings />} />
        <Route path="crop-prices" element={<CropPrices />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
```

## Available Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | LandingPage | Home/landing page |
| `/region-selection` | RegionSelection | Select farming region |
| `/crop-selection` | CropSelection | Select crops to monitor |
| `/dashboard` | Dashboard | Main dashboard with analytics |
| `/disease-detection` | DiseaseDetection | AI disease detection |
| `/chatbot` | Chatbot | AI assistant |
| `/settings` | Settings | Application settings |
| `/crop-prices` | CropPrices | Market price dashboard |
| `*` | NotFound | 404 error page |

## Navigation Components

### Link Component
Use for declarative navigation:

```tsx
import { Link } from 'react-router-dom';

<Link to="/dashboard">Go to Dashboard</Link>
<Link to="/settings" state={{ from: 'dashboard' }}>Settings</Link>
```

### NavLink Component
Automatically applies active styling:

```tsx
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/dashboard" 
  className={({ isActive }) => 
    isActive ? "text-green-600 font-bold" : "text-gray-600"
  }
>
  Dashboard
</NavLink>
```

## Navigation Hooks

### useNavigate
Programmatic navigation:

```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Basic navigation
navigate('/dashboard');

// Navigate with state
navigate('/settings', { state: { from: 'dashboard' } });

// Replace current entry
navigate('/dashboard', { replace: true });

// Go back/forward
navigate(-1); // Go back
navigate(1);  // Go forward
```

### useLocation
Access current location information:

```tsx
import { useLocation } from 'react-router-dom';

const location = useLocation();

console.log(location.pathname); // "/dashboard"
console.log(location.search);   // "?tab=profile"
console.log(location.hash);     // "#section1"
console.log(location.state);    // { from: 'dashboard' }
```

### useParams
Access URL parameters:

```tsx
import { useParams } from 'react-router-dom';

// For route like /user/:id
const { id } = useParams();
```

### useSearchParams
Access and modify URL search parameters:

```tsx
import { useSearchParams } from 'react-router-dom';

const [searchParams, setSearchParams] = useSearchParams();

// Get parameter
const tab = searchParams.get('tab');

// Set parameters
setSearchParams({ tab: 'profile' });

// Update parameters
setSearchParams(prev => {
  prev.set('tab', 'settings');
  return prev;
});
```

## Layout and Nested Routes

### Layout Component
The Layout component provides a consistent structure with navigation:

```tsx
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => (
  <div className="min-h-screen bg-gray-50">
    <Navigation />
    <main className="max-w-7xl mx-auto px-4 py-6">
      <Outlet />
    </main>
  </div>
);
```

### Outlet Component
Renders child routes in nested routing:

```tsx
import { Outlet } from 'react-router-dom';

const ParentComponent = () => (
  <div>
    <h1>Parent Component</h1>
    <Outlet /> {/* Child routes render here */}
  </div>
);
```

## State Management Between Routes

Currently using `sessionStorage` for simple state persistence:

```tsx
// Store data
sessionStorage.setItem('selectedDistrict', district);
sessionStorage.setItem('selectedCrops', JSON.stringify(crops));

// Retrieve data
const district = sessionStorage.getItem('selectedDistrict') || '';
const crops = JSON.parse(sessionStorage.getItem('selectedCrops') || '[]');
```

## Best Practices

1. **Use Link for Navigation**: Prefer `Link` over `useNavigate` for user-initiated navigation
2. **Use NavLink for Active States**: Automatically handles active styling
3. **Nested Routes**: Use Layout components with `Outlet` for consistent structure
4. **Error Boundaries**: Always include a catch-all route (`*`) for 404 handling
5. **State Management**: Consider using context or state management libraries for complex state
6. **URL Parameters**: Use meaningful parameter names and validate them
7. **Search Parameters**: Use for optional filters and pagination

## Examples

See `src/components/RouterExamples.tsx` for comprehensive examples of all React Router features.

## Migration from State-Based Routing

The project was migrated from state-based routing to React Router:

**Before (State-based):**
```tsx
const [currentPage, setCurrentPage] = useState('landing');

const renderCurrentPage = () => {
  switch (currentPage) {
    case 'landing': return <LandingPage />;
    case 'dashboard': return <Dashboard />;
    // ...
  }
};
```

**After (React Router):**
```tsx
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

## Benefits of React Router

1. **URL-based Navigation**: Users can bookmark and share URLs
2. **Browser History**: Back/forward buttons work correctly
3. **SEO Friendly**: Each route has its own URL
4. **Code Splitting**: Easy to implement lazy loading per route
5. **Nested Routes**: Clean component hierarchy
6. **Programmatic Navigation**: Easy to navigate based on user actions
