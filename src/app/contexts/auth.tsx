"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import customFetch from "@/app/utils/useFetch";

interface AuthContextProps {
  user: any;
  setUser: (user: any) => void;
  token: string;
}

const AuthContext = React.createContext<AuthContextProps>({
  user: {},
  setUser: () => {},
  token: ""
});

export const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getProfile() {
      const token = cookie.token;
      if (token) {
        try {
          const res = await customFetch("/getProfile", {
            headers: {
              "x-access-token": cookie.token
            }
          });
          setUser(res.data);
        } catch (error) {
          removeCookie("token");
          router.push("/login");
        }
      }
    }
    getProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
        token: cookie.token
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
