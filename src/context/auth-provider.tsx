import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from 'react';
import { User } from 'firebase/auth';

import { auth } from '../api';

export interface AuthContextValue {
  user: User | null;
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

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((data: User | null) => {
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
