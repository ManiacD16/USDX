import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  register: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/api/auth/login',
            { email, password },
            { withCredentials: true } // Include credentials
        );
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        alert('Login Successful.');
        return true; // Indicate success
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
        return false; // Indicate failure
    }
};


 const logout = async (): Promise<boolean> => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/auth/logout',
      {},
      { withCredentials: true } // Include credentials
    );
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    alert(response.data.message);
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    alert('Logout failed. Please try again later.');
    return false;
  }
};

 const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/auth/register',
      { email, password },
      { withCredentials: true }
    );

    if (response.status === 201) {
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
    } else {
      throw new Error('Registration failed'); // Throw an error for non-201 responses
    }
  } catch (error: any) {
    console.error('Registration failed:', error);
    // Propagate the error to the calling function
    throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
  }
};


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Optionally, fetch user info based on the token here
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
