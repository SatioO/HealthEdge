import React from 'react';
import {
  getStoredAuthData,
  JwtUserResponseDTO,
  login,
  logout,
} from '@/services/auth';

type AuthContextType = {
  isAuthenticated: boolean;
  user: JwtUserResponseDTO | null;
  role: string | null;
  login: (username: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

// Create AuthContext
const AuthContext = React.createContext<AuthContextType | null>(null);

// Custom hook to use AuthContext in any component
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<JwtUserResponseDTO | null>(null);
  const [userRole, setUserRole] = React.useState<string | null>(null);

  const checkAuthStatus = React.useCallback(async () => {
    try {
      const authData = await getStoredAuthData();
      if (authData) {
        setIsAuthenticated(true);
        setUser(authData.user);
        if (
          authData.user &&
          authData.user.roles &&
          authData.user.roles.length > 0
        ) {
          setUserRole(authData.user.roles[0]);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserRole(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
      setUserRole(null);
    }
  }, []);

  React.useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const authContext = React.useMemo(
    () => ({
      isAuthenticated,
      user,
      role: userRole,
      login: async (username: string, password: string) => {
        try {
          const response = await login({ username, password });
          setIsAuthenticated(true);
          setUser(response.user);
          if (
            response.user &&
            response.user.roles &&
            response.user.roles.length > 0
          ) {
            setUserRole(response.user.roles[0]);
          }
          return response;
        } catch (error) {
          throw error;
        }
      },
      logout: async () => {
        try {
          await logout();
          setIsAuthenticated(false);
          setUser(null);
          setUserRole(null);
        } catch (error) {
          console.error('Error during logout:', error);
          throw error;
        }
      },
      refreshAuth: checkAuthStatus,
    }),
    [isAuthenticated, user, checkAuthStatus]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
