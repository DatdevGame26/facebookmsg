import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [user, setUser] = useState(null); // Thêm state user

  return (
    <AuthContext.Provider value={{ isSignIn, setIsSignIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
