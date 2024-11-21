"use client";
import BackRoute from "@/components/BackRoute";
import Header from "@/components/Header";
import InputPassword from "@/components/InputPassword";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import customFetch from "@/utils/useFetch";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confimrPassword, setConfirmPassword] = useState<string>("");

  const handleRegister = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await customFetch("/register", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });
      router.push("/auth/login");
    } catch (error: any) {
      alert(error.message);
      setLoading(false);
    }
  };

  const disabledBtn =
    !email.length ||
    !username.length ||
    !password.length ||
    !confimrPassword.length ||
    password !== confimrPassword ||
    loading;

  return (
    <div className="main-site min-h-full bg-base">
      <Header />
      <main>
        <BackRoute link="/auth/login" />
        <p className="text-xl font-bold mt-8 mb-6">Register</p>
        <form onSubmit={(e) => handleRegister(e)}>
          <input
            name="email"
            className="p-4 rounded-lg mb-4 w-full"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <input
            name="username"
            className="p-4 rounded-lg mb-4 w-full"
            type="text"
            placeholder="Create Username"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />
          <InputPassword
            value={password}
            placeholder="Create Password"
            handleChange={(e: any) => setPassword(e.target.value)}
          />
          <InputPassword
            value={confimrPassword}
            placeholder="Confirm Password"
            handleChange={(e: any) => setConfirmPassword(e.target.value)}
          />
          <button
            className="btn-gradient w-full p-4 rounded-lg mt-6"
            disabled={disabledBtn}>
            Register
          </button>
        </form>
        <div className="text-center text-[13px] mt-10">
          Have an account?{" "}
          <Link
            className="link-golden link-golden-underline"
            href="/auth/login">
            Login here
          </Link>
        </div>
      </main>
    </div>
  );
}
