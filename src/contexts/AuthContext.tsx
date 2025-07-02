import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  sendOTP: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('melo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const sendOTP = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('OTP sent to:', email);
  };

  const login = async (email: string, otp: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (otp === '123456') {
      const newUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        isVerified: true,
      };
      setUser(newUser);
      localStorage.setItem('melo_user', JSON.stringify(newUser));
    } else {
      throw new Error('Invalid OTP');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('melo_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    sendOTP,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}