"use client";

import BackRoute from "@/components/BackRoute";
import Header from "@/components/Header";
import customFetch from "@/utils/useFetch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";

export default function Interest() {
  const { user, token, setUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [interest, setInterest] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);

  const removeInterest = (index: Number) => {
    const dupIntersets = interests.filter((_, i) => i !== index);
    setInterests(dupIntersets);
  };

  const handleInterest = (e: any) => {
    e.preventDefault();

    if (interest) {
      interests.push(interest);
      setInterest("");
    }
  };

  const handleSubmitInterests = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await customFetch("/updateProfile", {
        method: "PUT",
        headers: {
          "x-access-token": token,
        },
        body: JSON.stringify({
          interests: interests,
        }),
      });
      setUser(res.data);
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setInterests(user?.interests || []);
    }
  }, [user]);

  return (
    <div className="main-site h-full bg-base">
      <Header />
      <main>
        <div className="flex justify-between">
          <BackRoute link="/" />
          <button
            className="link-blue"
            disabled={loading}
            onClick={handleSubmitInterests}>
            Save
          </button>
        </div>
        <div className="mt-10 p-3">
          <p className="link-golden hover:opacity-100 mb-1">
            Tell everyone about yourself
          </p>
          <p className="text-xl mb-6 font-bold">What interest you?</p>

          <form
            onSubmit={handleInterest}
            className="rounded-md px-3 py-3 bg-white-6 w-full flex flex-wrap">
            {interests &&
              interests.map((item, i) => (
                <div key={i}>
                  <p className="py-2 mr-2 my-1 bg-white-10 px-2 rounded-sm flex gap-x-2">
                    {item}{" "}
                    <button type="button" onClick={() => removeInterest(i)}>
                      <Image
                        src="/assets/icons/close.svg"
                        alt="close alt"
                        style={{ width: "15px", height: "15px" }}
                        width={15}
                        height={15}
                      />
                    </button>
                  </p>
                </div>
              ))}
            <input
              value={interest}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInterest(e.target.value)
              }
              className="w-[100px] my-1 bg-transparent focus-visible:outline-none"
            />
          </form>
        </div>
      </main>
    </div>
  );
}
