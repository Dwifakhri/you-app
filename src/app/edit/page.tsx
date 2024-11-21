"use client";

import BackRoute from "@/components/BackRoute";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { generateZodiac } from "@/utils/generateZodiac";
import customFetch from "@/utils/useFetch";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth";
import ProfileCard from "@/components/ProfileCard";
import Logout from "@/components/Logout";

export default function Edit() {
  const { token, user, setUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [horoscope, setHoroscope] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleBirthday = (e: any) => {
    const zodiac: string = generateZodiac(e.target.value) ?? "";
    const horoscope: string = generateZodiac(e.target.value, false) ?? "";

    setZodiac(zodiac);
    setHoroscope(horoscope);
    setBirthday(e?.target?.value);
  };

  const handleHeight = () => {
    if (height && !height.includes("cm")) {
      setHeight(`${height} cm`);
    } else {
      setHeight("");
    }
  };

  const handleWeight = () => {
    if (weight && !weight.includes("kg")) {
      setWeight(`${weight} kg`);
    } else {
      setWeight("");
    }
  };

  const handleEdit = async (e: any) => {
    const heightP = height?.split(" ")[0];
    const weightP = weight?.split(" ")[0];
    try {
      setLoading(true);
      e.preventDefault();
      const res = await customFetch("/updateProfile", {
        method: "PUT",
        headers: {
          "x-access-token": token,
        },
        body: JSON.stringify({
          name: name,
          birthday: birthday,
          height: +heightP,
          weight: +weightP,
          interest: [],
        }),
      });
      setUser(res.data);
      router.push("/");
    } catch (error: any) {
      alert(error.message);
      setLoading(false);
    }
  };

  const age = user?.birthday
    ? new Date().getFullYear() - new Date(user?.birthday).getFullYear()
    : 0;

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setBirthday(user?.birthday || "");
      setHeight(user?.height?.toString() || "");
      setWeight(user?.weight?.toString() || "");
      setHoroscope(user?.horoscope || "");
      setZodiac(user?.zodiac || "");
    }
  }, [user]);

  return (
    <div className="main-site h-full bg-bgDark">
      <Header />
      <main>
        <div className="flex justify-between">
          <BackRoute link="/" />
          <p className="font-semibold">@{user?.username}</p>
          <Logout />
        </div>
        <ProfileCard user={user} age={age} />
        <form className="bg-[#0E191F] rounded-md p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold">About</p>
            <button
              type="button"
              className="link-golden text-[13px]"
              onClick={handleEdit}
              disabled={loading}>
              Save & Update
            </button>
          </div>
          {!user ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div className="flex gap-x-2 mb-4">
                <label
                  htmlFor="photo"
                  className="flex gap-x-3 items-center cursor-pointer">
                  <div className="bg-white-8 rounded-xl flex justify-center align-center p-4">
                    <Image
                      src="/assets/icons/plus.svg"
                      alt="Pencil alt"
                      width={16}
                      height={16}
                    />
                  </div>
                  <p className="text-[13px]">Add Image</p>
                </label>
                <input id="photo" type="file" className="hidden" />
              </div>
              <div className="grid grid-cols-3 items-center mb-3 text-[13px]">
                <label htmlFor="name" className="text-white-33">
                  Display name:
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  type="text"
                  className="col-span-2 border border-white-22 rounded-md px-3 py-2 text-right"
                />
              </div>
              <div className="grid grid-cols-3 items-center mb-3 text-[13px]">
                <label htmlFor="gender" className="text-white-33">
                  Gender:
                </label>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  id="gender"
                  className="col-span-2 bg-white-6 border border-white-22 rounded-md py-2 text-right text-white-40">
                  <option id="selectGender" value="">
                    Select gender
                  </option>
                  <option id="male" value="male">
                    Male
                  </option>
                  <option id="female" value="female">
                    Female
                  </option>
                </select>
              </div>
              <div className="grid grid-cols-3 items-center mb-3 text-[13px]">
                <label htmlFor="birthday" className="text-white-33">
                  Birthday:
                </label>
                <input
                  id="birthday"
                  name="birthday"
                  value={birthday}
                  onChange={(e) => handleBirthday(e)}
                  placeholder="DD MM YYYY"
                  type="date"
                  className="col-span-2 border border-white-22 rounded-md px-3 py-2 text-right text-white-40"
                />
              </div>
              <div className="grid grid-cols-3 items-center mb-3 text-[13px]">
                <label htmlFor="horoscope" className="text-white-33">
                  Horoscope:
                </label>
                <input
                  id="horoscope"
                  value={horoscope}
                  onChange={(e) => setHoroscope(e.target.value)}
                  readOnly
                  placeholder="--"
                  type="text"
                  className="col-span-2 border border-white-22 rounded-md px-3 py-2 text-right text-white-40"
                />
              </div>
              <div className="grid grid-cols-3 items-center mb-3 text-[13px]">
                <label htmlFor="zodiac" className="text-white-33">
                  Zodiac:
                </label>
                <input
                  id="zodiac"
                  value={zodiac}
                  onChange={(e) => setZodiac(e.target.value)}
                  readOnly
                  placeholder="--"
                  type="text"
                  className="col-span-2 border border-white-22 rounded-md px-3 py-2 text-right text-white-40"
                />
              </div>
              <div className="grid grid-cols-3 items-center mb-3 text-[13px]">
                <label htmlFor="height" className="text-white-33">
                  Height:
                </label>
                <input
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  onBlur={handleHeight}
                  placeholder="Add height"
                  type="text"
                  className="col-span-2 border border-white-22 rounded-md px-3 py-2 text-right"
                />
              </div>
              <div className="grid grid-cols-3 items-center mb-3 text-[13px]">
                <label htmlFor="weight" className="text-white-33">
                  Weight:
                </label>
                <input
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  onBlur={handleWeight}
                  placeholder="Add weight"
                  type="text"
                  className="col-span-2 border border-white-22 rounded-md px-3 py-2 text-right"
                />
              </div>
            </div>
          )}
        </form>
        <div className="bg-[#0E191F] rounded-md p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold">Interest</p>
            <Link href="/interest">
              <Image
                src="/assets/icons/pencil.svg"
                alt="Pencil alt"
                width={16}
                height={16}
              />
            </Link>
          </div>
          <p className="opacity-60">
            Add in your interest to find a better match
          </p>
        </div>
      </main>
    </div>
  );
}
