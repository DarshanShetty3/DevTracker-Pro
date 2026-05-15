import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage'; // Your existing overview page
import AppLayout from './components/layout/AppLayout'; // The new sidebar wrapper
import KanbanPage from './pages/KanbanPage';
import VaultPage from './pages/VaultPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />

        {/* Protected App Routes (Wrapped in the Sidebar Layout) */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Index route for /app */}
          <Route index element={<DashboardPage />} />

          {/* Sub-routes */}
          <Route path="tracker" element={<KanbanPage />} />
          <Route path="vault" element={<VaultPage />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;