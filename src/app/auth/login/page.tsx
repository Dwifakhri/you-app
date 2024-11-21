"use client";
import BackRoute from "@/components/BackRoute";
import Header from "@/components/Header";
import InputPassword from "@/components/InputPassword";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useAuth } from "@/contexts/auth";
import customFetch from "@/utils/useFetch";

export default function Login() {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await customFetch("/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          username: "",
          password: password,
        }),
      });
      await getProfile(res.access_token);
    } catch (error: any) {
      alert(error.message);
      setLoading(false);
    }
  };

  const getProfile = async (token: string) => {
    try {
      const res = await customFetch("/getProfile", {
        headers: {
          "x-access-token": token,
        },
      });
      setUser(res.data);
      setCookie("token", token, {
        secure: true,
        sameSite: "strict",
        path: "/",
      });
      router.push("/");
    } catch (error: any) {
      alert(error.message);
      setLoading(false);
    }
  };

  const disabledBtn = !email.length || !password.length || loading;

  return (
    <div className="main-site min-h-full bg-base">
      <Header />
      <main>
        <BackRoute link="/auth/register" />
        <p className="text-xl font-bold mt-8 mb-6">Login</p>
        <form onSubmit={handleLogin}>
          <input
            className="p-4 rounded-lg mb-4 w-full"
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <InputPassword
            value={password}
            placeholder="Enter Password"
            handleChange={(e: any) =>
              setPassword(e.target.value)
            }></InputPassword>
          <button
            className="btn-gradient w-full p-4 rounded-lg mt-6"
            disabled={disabledBtn}>
            Login
          </button>
        </form>
        <div className="text-center text-[13px] mt-10">
          No account?{" "}
          <Link
            className="link-golden link-golden-underline"
            href="/auth/register">
            Register here
          </Link>
        </div>
      </main>
    </div>
  );
}
