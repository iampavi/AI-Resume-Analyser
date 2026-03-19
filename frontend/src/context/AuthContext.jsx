import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [authType, setAuthType] = useState(null);

  return (
    <AuthContext.Provider value={{ authType, setAuthType }}>
      {children}
    </AuthContext.Provider>
  );
}