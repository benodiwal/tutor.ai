"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState }  from "react";

interface AuthContextType {
    user: any;
    setUser: any;
    isAuthenticated?: boolean;
    loading?: boolean;
    onSignin: any;
}

export const AuthContext = createContext<AuthContextType>({
    user: {},
    setUser: () => {},
    isAuthenticated: false,
    loading: false,
    onSignin: () => {},
});


type AuthProviderProps = {
    children: React.ReactNode,
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  
  const [user, setUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const onSignIn = (user: any, token: string) => {
    try {
        localStorage.setItem("token", token);
        setToken(token);
        setUser(user);
        setIsAuthenticated(true);
    } catch (error) {
        console.log(error);   
    }
  }

   useEffect(() => {
    setToken(localStorage.getItem("token") || "");
    const fetchUser = async () => {
      try {
        const { data } = await axios("http://localhost:5000/user/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        setUser(data.user);
        setIsAuthenticated(true);
        setToken(localStorage.getItem("token") || "");
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  return(
  <AuthContext.Provider
  value={{
    user: user,
    setUser: setUser,
    isAuthenticated: isAuthenticated,
    loading: loading,
    onSignin: onSignIn,   
  }}
  >
    {children}
  </AuthContext.Provider>
  );

}

export const useAuth = () => {
  const {
    user,
    setUser,
    isAuthenticated,
    loading,
    onSignin
  } = useContext(AuthContext);

  return {
    user,
    setUser,
    isAuthenticated,
    loading,
    onSignin
  };
};