import { useState, useEffect } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  role: "participant" | "judge" | "admin";
}

const mockUser: User = {
  id: 1,
  username: "demo_user",
  email: "demo@hackathon.com",
  role: "participant"
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 500);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
