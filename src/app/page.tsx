"use client";

import BackRoute from "@/app/components/BackRoute";
import Header from "@/app/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/contexts/auth";
import ProfileCard from "@/app/components/ProfileCard";
import Logout from "@/app/components/Logout";

export default function Home() {
  const { user } = useAuth();

  const genereateDate = (date: string) => {
    if (date) {
      const d = new Date(date);
      const formatted = `${d.getDate()} / ${
        d.getMonth() + 1
      } / ${d.getFullYear()} (Age ${age})`;
      return formatted ?? "-";
    }
  };

  const age = user?.birthday
    ? new Date().getFullYear() - new Date(user?.birthday).getFullYear()
    : 0;

  const isEdited =
    user?.birthday ||
    user?.horoscope ||
    user?.name ||
    user?.zodiac ||
    user?.gender ||
    user?.height ||
    user?.weight;

  const isInterests = user?.interests.length;

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
        <div className="bg-[#0E191F] rounded-md p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold">About</p>
            <Link href="/edit">
              <Image
                src="/assets/icons/pencil.svg"
                alt="Pencil alt"
                width={16}
                height={16}
              />
            </Link>
          </div>
          {!isEdited ? (
            <p className="opacity-60">
              Add in your your to help others know you better
            </p>
          ) : (
            <div>
              <p className="mb-3">
                <span className="text-white-33">Birthday:</span>{" "}
                {genereateDate(user?.birthday)}
              </p>
              <p className="mb-3">
                <span className="text-white-33">Horoscope:</span>{" "}
                {user?.horoscope || "-"}
              </p>
              <p className="mb-3">
                <span className="text-white-33">Zodiac:</span>{" "}
                {user?.zodiac || "-"}
              </p>
              <p className="mb-3">
                <span className="text-white-33">Height:</span>{" "}
                {user?.height ? user?.height + " cm" : "-"}
              </p>
              <p className="mb-3">
                <span className="text-white-33">Weight:</span>{" "}
                {user?.weight ? user?.weight + " kg" : "-"}
              </p>
            </div>
          )}
        </div>
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
          {!isInterests ? (
            <p className="opacity-60">
              Add in your interest to find a better match
            </p>
          ) : (
            <div className="flex flex-wrap">
              {user?.interests?.map((item: string, i: number) => (
                <p key={i} className="bg-white-6 rounded-full px-4 py-1">
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
