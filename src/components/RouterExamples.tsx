import React from 'react';
import { 
  Link, 
  NavLink, 
  useNavigate, 
  useLocation, 
  useParams,
  useSearchParams,
  Outlet 
} from 'react-router-dom';

// Example component showing different React Router hooks and components
const RouterExamples = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">React Router Examples</h1>
      
      {/* Basic Link Component */}
      <section>
        <h2 className="text-xl font-semibold mb-2">1. Link Component</h2>
        <p className="mb-2">Use Link for navigation without page refresh:</p>
        <div className="space-x-2">
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            Go to Dashboard
          </Link>
          <Link to="/settings" className="text-blue-600 hover:underline">
            Go to Settings
          </Link>
        </div>
      </section>

      {/* NavLink Component */}
      <section>
        <h2 className="text-xl font-semibold mb-2">2. NavLink Component</h2>
        <p className="mb-2">NavLink automatically adds active styling:</p>
        <nav className="space-x-2">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              isActive ? "text-green-600 font-bold" : "text-gray-600"
            }
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              isActive ? "text-green-600 font-bold" : "text-gray-600"
            }
          >
            Settings
          </NavLink>
        </nav>
      </section>

      {/* useNavigate Hook */}
      <section>
        <h2 className="text-xl font-semibold mb-2">3. useNavigate Hook</h2>
        <p className="mb-2">Programmatic navigation:</p>
        <div className="space-x-2">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Navigate to Dashboard
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Go Back
          </button>
          <button 
            onClick={() => navigate('/settings', { replace: true })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Replace with Settings
          </button>
        </div>
      </section>

      {/* useLocation Hook */}
      <section>
        <h2 className="text-xl font-semibold mb-2">4. useLocation Hook</h2>
        <p className="mb-2">Current location information:</p>
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Pathname:</strong> {location.pathname}</p>
          <p><strong>Search:</strong> {location.search}</p>
          <p><strong>Hash:</strong> {location.hash}</p>
          <p><strong>State:</strong> {JSON.stringify(location.state)}</p>
        </div>
      </section>

      {/* useParams Hook */}
      <section>
        <h2 className="text-xl font-semibold mb-2">5. useParams Hook</h2>
        <p className="mb-2">URL parameters (if any):</p>
        <div className="bg-gray-100 p-4 rounded">
          <pre>{JSON.stringify(params, null, 2)}</pre>
        </div>
      </section>

      {/* useSearchParams Hook */}
      <section>
        <h2 className="text-xl font-semibold mb-2">6. useSearchParams Hook</h2>
        <p className="mb-2">URL search parameters:</p>
        <div className="space-y-2">
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Current search params:</strong></p>
            <pre>{JSON.stringify(Object.fromEntries(searchParams), null, 2)}</pre>
          </div>
          <div className="space-x-2">
            <button 
              onClick={() => setSearchParams({ tab: 'profile' })}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Set tab=profile
            </button>
            <button 
              onClick={() => setSearchParams({ tab: 'settings' })}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Set tab=settings
            </button>
            <button 
              onClick={() => setSearchParams({})}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear params
            </button>
          </div>
        </div>
      </section>

      {/* Nested Routes with Outlet */}
      <section>
        <h2 className="text-xl font-semibold mb-2">7. Nested Routes</h2>
        <p className="mb-2">This component can render child routes using Outlet:</p>
        <div className="border-2 border-dashed border-gray-300 p-4 rounded">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default RouterExamples;
