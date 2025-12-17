import { useState, useEffect } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  role: "participant" | "judge" | "admin" | "mentor";
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (role: "participant" | "judge" | "admin" | "mentor", email?: string, name?: string) => {
    setUser({
      id: 1,
      username: name || "demo_user",
      email: email || "demo@hackathon.com",
      role: role as "participant" | "judge" | "admin" | "mentor"
    });
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
