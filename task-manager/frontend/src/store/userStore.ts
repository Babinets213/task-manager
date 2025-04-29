// src/store/userStore.ts
import { useState } from "react";

type User = {
  username: string;
  email: string;
};

export const useUserStore = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, email: string) => {
    setUser({ username, email });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};
