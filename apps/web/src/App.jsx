import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import { PilotAuthProvider } from './contexts/PilotAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PilotProtectedRoute from './components/PilotProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import RankingPage from './pages/RankingPage';
import PilotosPage from './pages/PilotosPage';
import CadastroPilotoPage from './pages/CadastroPilotoPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import PilotLoginPage from './pages/PilotLoginPage';
import PilotDashboardPage from './pages/PilotDashboardPage';
import PatrocinadorPage from './pages/PatrocinadorPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <PilotAuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/pilotos" element={<PilotosPage />} />
            <Route path="/patrocinadores" element={<PatrocinadorPage />} />
            <Route path="/cadastro" element={<CadastroPilotoPage />} />
            <Route path="/login" element={<PilotLoginPage />} />
            <Route path="/piloto/login" element={<PilotLoginPage />} />
            <Route
              path="/piloto/dashboard"
              element={
                <PilotProtectedRoute>
                  <PilotDashboardPage />
                </PilotProtectedRoute>
              }
            />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-6xl font-heading font-black text-primary mb-4">404</h1>
                  <p className="text-xl text-secondary-foreground mb-8">Pagina nao encontrada.</p>
                  <Link
                    to="/"
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-sm font-heading font-bold uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    Voltar ao Inicio
                  </Link>
                </div>
              }
            />
          </Routes>
        </PilotAuthProvider>
      </AuthProvider>
      <Toaster theme="dark" position="top-right" />
    </Router>
  );
}

export default App;
