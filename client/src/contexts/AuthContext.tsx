import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { User } from '@shared/schema';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => 
    localStorage.getItem('auth_token')
  );
  const queryClient = useQueryClient();

  // Get current user
  const { data: userData, isLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    enabled: !!token,
    retry: false,
  });

  const user = (userData as any)?.user || null;
  const isAuthenticated = !!user;

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await apiRequest('POST', '/api/auth/login', { email, password });
      return response.json();
    },
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.setItem('auth_token', data.token);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: {
      email: string;
      password: string;
      confirmPassword: string;
      firstName: string;
      lastName: string;
    }) => {
      const response = await apiRequest('POST', '/api/auth/register', userData);
      return response.json();
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const register = async (userData: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  }) => {
    await registerMutation.mutateAsync(userData);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('auth_token');
    queryClient.clear();
  };

  // Token is automatically included in API requests via queryClient.ts

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
