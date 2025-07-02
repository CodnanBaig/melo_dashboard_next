import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginForm from './components/Auth/LoginForm';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Releases from './pages/Releases';
import Artists from './pages/Artists';
import Labels from './pages/Labels';
import Analytics from './pages/Analytics';
import Royalties from './pages/Royalties';
import Payouts from './pages/Payouts';
import Settings from './pages/Settings';
import Help from './pages/Help';
import CreateRelease from './pages/CreateRelease';
import ReleaseDetails from './pages/ReleaseDetails';
import SmartLink from './pages/SmartLink';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="releases" element={<Releases />} />
        <Route path="releases/create" element={<CreateRelease />} />
        <Route path="releases/:id" element={<ReleaseDetails />} />
        <Route path="releases/:id/smart-link" element={<SmartLink />} />
        <Route path="artists" element={<Artists />} />
        <Route path="labels" element={<Labels />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="royalties" element={<Royalties />} />
        <Route path="payouts" element={<Payouts />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;