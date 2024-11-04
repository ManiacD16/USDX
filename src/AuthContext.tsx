import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';

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

  const login = async (email: string, password: string): Promise<boolean> => {
  // Check if the user is already authenticated
  if (isAuthenticated) {
    alert('You are already logged in.');
    return false; // Return false to indicate no login action was taken
  }

  try {
    const response: AxiosResponse<{ token: string; user: User }> = await axios.post(
      'http://localhost:3000/api/auth/login',
      { email, password },
      { withCredentials: true }
    );

    // Assuming the response contains user info and a token upon successful login
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true); // Update authentication state
      alert('Login Successful.');
      return true; // Indicate success
    } else {
      // If the response is not successful, alert the user
      alert('Login failed. Please check your credentials.');
      return false;
    }
  } catch (error: any) {
    console.error('Login failed:', error.response ? error.response.data : error);
    alert('Login failed. Please check your credentials.');
    return false; // Indicate failure
  }
};

const logout = async (): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ message?: string }> = await axios.post(
      'http://localhost:3000/api/auth/logout',
      {},
      { withCredentials: true } // Include credentials
    );

    // Check for successful response status
    if (response.status === 200) {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      alert(response.data.message || 'Logged out successfully'); // Handle server message
      return true;
    } else {
      throw new Error('Unexpected logout response');
    }
  } catch (error: any) {
    console.error('Error during logout:', error.response?.data || error); // Log specific error
    alert(error.response?.data?.message || 'Logout failed. Please try again later.');
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
