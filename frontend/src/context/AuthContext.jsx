import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔥 ADD THIS (for modal)
  const [authType, setAuthType] = useState(null);

  // ✅ Load user on refresh
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setUser(email);
    }
  }, []);

  // ✅ LOGIN
  const login = (email, token) => {
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
    setUser(email);

    // 🔥 CLOSE MODAL AFTER LOGIN
    setAuthType(null);
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        authType,     // ✅ modal state
        setAuthType   // ✅ modal control
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};