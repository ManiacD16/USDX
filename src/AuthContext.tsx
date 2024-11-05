import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  StoreTokenInLS: (serverToken: string) => void;
  RemoveTokenFromLS: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // Update the token state if it's changed in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // Store token in localStorage
  const StoreTokenInLS = (serverToken: string) => {
    localStorage.setItem('token', serverToken);
    setToken(serverToken); // Update token state
  };

  // Remove token from localStorage
  const RemoveTokenFromLS = () => {
    localStorage.removeItem('token');
    setToken(null); // Reset token state
  };

  const isAuthenticated = !!token; // Check if the user is authenticated based on the token

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, StoreTokenInLS, RemoveTokenFromLS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
