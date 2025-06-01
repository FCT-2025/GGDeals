import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { User } from "../services/AuthService";
import { getUsuario } from "../services/AuthService";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const initialized = useRef(false);

  const fetchUser = () => {
    getUsuario().then((fetchedUser) => {
      setUser(fetchedUser);
    }).catch((err) => {
        console.error("Error fetching user:", err);
      });;
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
