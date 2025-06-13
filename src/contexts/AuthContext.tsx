import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "user" | "trainer" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved authentication on app load
    const savedUser = localStorage.getItem("skillguide_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem("skillguide_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    role: UserRole,
  ): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call - replace with actual authentication
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication logic
    const mockUsers = {
      "user@skillguide.com": {
        id: "1",
        email: "user@skillguide.com",
        name: "John Student",
        role: "user" as UserRole,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        department: "Computer Science",
      },
      "trainer@skillguide.com": {
        id: "2",
        email: "trainer@skillguide.com",
        name: "Sarah Instructor",
        role: "trainer" as UserRole,
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b287?w=32&h=32&fit=crop&crop=face",
        department: "Training Department",
        permissions: ["view_students", "create_assessments", "grade_tests"],
      },
      "admin@skillguide.com": {
        id: "3",
        email: "admin@skillguide.com",
        name: "Michael Administrator",
        role: "admin" as UserRole,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        department: "IT Administration",
        permissions: ["full_access", "manage_users", "system_settings"],
      },
    };

    // Check if user exists and password is correct (mock)
    const mockUser = mockUsers[email as keyof typeof mockUsers];
    if (mockUser && password === "password" && mockUser.role === role) {
      setUser(mockUser);
      localStorage.setItem("skillguide_user", JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("skillguide_user");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
