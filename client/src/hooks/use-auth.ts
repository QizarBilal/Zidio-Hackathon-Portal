import { useState, useEffect } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  role: "participant" | "judge" | "admin" | "mentor";
}

// Demo credentials for testing
const DEMO_CREDENTIALS = {
  participant: {
    email: "participant@demo.com",
    password: "participant123",
    name: "Demo Participant",
    id: 1
  },
  mentor: {
    email: "mentor@demo.com",
    password: "mentor123",
    name: "Demo Mentor",
    id: 2
  },
  judge: {
    email: "judge@demo.com",
    password: "judge123",
    name: "Demo Judge",
    id: 3
  },
  admin: {
    email: "admin@demo.com",
    password: "admin123",
    name: "Demo Admin",
    id: 4
  }
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is already logged in (stored in localStorage)
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = (email: string, password: string, selectedRole: "participant" | "judge" | "admin" | "mentor") => {
    // Validate credentials
    const roleCredentials = DEMO_CREDENTIALS[selectedRole];
    
    if (email === roleCredentials.email && password === roleCredentials.password) {
      const authenticatedUser = {
        id: roleCredentials.id,
        username: roleCredentials.name,
        email: roleCredentials.email,
        role: selectedRole
      };
      setUser(authenticatedUser);
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      return { success: true, user: authenticatedUser };
    }
    
    return { success: false, error: "Invalid credentials for selected role" };
  };

  const login = (role: "participant" | "judge" | "admin" | "mentor", email?: string, name?: string) => {
    const userData = {
      id: DEMO_CREDENTIALS[role].id,
      username: name || DEMO_CREDENTIALS[role].name,
      email: email || DEMO_CREDENTIALS[role].email,
      role: role as "participant" | "judge" | "admin" | "mentor"
    };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    authenticate,
    DEMO_CREDENTIALS // Export for display purposes
  };
}
