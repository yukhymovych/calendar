import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { auth } from "../firebase/config";

export interface AuthContextValue {
  user: any;
  isLoggedIn: boolean;
}

const defaultValue: AuthContextValue = {
  user: null,
  isLoggedIn: false,
};

export const AuthContext = createContext<AuthContextValue>(defaultValue);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<any>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((data) => {
      setUser(data);
    });
  }, []);

  useEffect(() => {
    if (user?.email) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
