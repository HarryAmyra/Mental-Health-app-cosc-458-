import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";
import { auth } from "../config/firebaseClient.js";

const AuthContext = createContext({
  user: null,
  loading: true,
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value = {
    user,
    loading,
    signOut: () => fbSignOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
