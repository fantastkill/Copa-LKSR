import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { usePilotAuth } from '@/contexts/PilotAuthContext.jsx';

const OPEN_PILOT_ACCESS = true;
const DEMO_IDENTIFIER = 'luis@copalskr.com.br';
const DEMO_PASSWORD = '123456';

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-muted">Carregando...</p>
    </div>
  </div>
);

const PilotProtectedRoute = ({ children }) => {
  const { isPilotAuthenticated, initialLoading, loginPilot } = usePilotAuth();
  const [autoLoginInProgress, setAutoLoginInProgress] = useState(false);
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

  useEffect(() => {
    if (!OPEN_PILOT_ACCESS || initialLoading || isPilotAuthenticated || autoLoginAttempted) {
      return;
    }

    let isMounted = true;
    setAutoLoginAttempted(true);
    setAutoLoginInProgress(true);

    loginPilot(DEMO_IDENTIFIER, DEMO_PASSWORD)
      .catch(() => {
        // In open mode we still allow access even if demo auto-login fails.
      })
      .finally(() => {
        if (isMounted) {
          setAutoLoginInProgress(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [initialLoading, isPilotAuthenticated, autoLoginAttempted, loginPilot]);

  if (initialLoading || autoLoginInProgress) {
    return <LoadingScreen />;
  }

  if (!isPilotAuthenticated && !OPEN_PILOT_ACCESS) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PilotProtectedRoute;
