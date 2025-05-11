
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  email: string;
  name: string;
  plan: 'free' | 'premium';
  githubConnected?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isPremium: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  connectGithub: () => void;
  disconnectGithub: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('doxgen-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Mock login - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock user object - in a real app, this would come from the backend
      const mockUser: User = {
        email,
        name: email.split('@')[0],
        plan: email.includes('premium') ? 'premium' : 'free',
        githubConnected: false
      };
      
      localStorage.setItem('doxgen-user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Login successful",
        description: "Welcome back to DoxGen!",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signup = async (email: string, password: string, name: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Mock signup - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock user object
      const mockUser: User = {
        email,
        name,
        plan: 'free',
        githubConnected: false
      };
      
      localStorage.setItem('doxgen-user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Account created",
        description: "Welcome to DoxGen!",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('doxgen-user');
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const connectGithub = () => {
    if (!user) return;
    
    // In a real app, this would redirect to GitHub OAuth
    const updatedUser: User = {
      ...user,
      githubConnected: true
    };
    
    setUser(updatedUser);
    localStorage.setItem('doxgen-user', JSON.stringify(updatedUser));
    
    toast({
      title: "GitHub Connected",
      description: "Your GitHub account has been connected successfully.",
    });
  };

  const disconnectGithub = () => {
    if (!user) return;
    
    const updatedUser: User = {
      ...user,
      githubConnected: false
    };
    
    setUser(updatedUser);
    localStorage.setItem('doxgen-user', JSON.stringify(updatedUser));
    
    toast({
      title: "GitHub Disconnected",
      description: "Your GitHub account has been disconnected.",
    });
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isPremium: user?.plan === 'premium',
        login,
        signup,
        logout,
        connectGithub,
        disconnectGithub
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
