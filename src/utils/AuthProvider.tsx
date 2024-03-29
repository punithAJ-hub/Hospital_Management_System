import axios from "axios";
import React, {
  createContext,
  SetStateAction,
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

// Provide the authentication context to the children components
const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const [user, setUser_] = useState(localStorage.getItem("user"));

  // Function to set the authentication token
  const setUser = (newUser) => {
    setUser_(newUser);
  };

  const [name, setName_] = useState(localStorage.getItem("name"));

  // Function to set the authentication token
  const setName = (name) => {
    setName_(name);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
