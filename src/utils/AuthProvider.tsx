import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Create the authentication context
const AuthContext = createContext();

// Custom hook to consume the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [user, setUser_] = useState(localStorage.getItem("user"));
  const [name, setName_] = useState(localStorage.getItem("name"));
  const [role, setRole_] = useState(localStorage.getItem("role"));
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setUser = (newUser) => {
    setUser_(newUser);
  };

  const setName = (name) => {
    setName_(name);
  };

  const setRole = (role) => {
    setRole_(role);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      console.log("User while setting token", user);
      localStorage.setItem("user", user);
      localStorage.setItem("name", name);
      console.log("User name setting token", name);
      localStorage.setItem("role", role);
      console.log("User role setting token", role);
    }
  }, [token, user, name, role]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
      name,
      setName,
      role,
      setRole,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
