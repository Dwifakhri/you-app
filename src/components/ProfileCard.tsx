"use client";

import Image from "next/image";
import { FC } from "react";

interface ProfileCardProps {
  user: any;
  age: number;
}

const ProfileCard: FC<ProfileCardProps> = ({ user, age }) => {
  return (
    <div className="bg-[#162329] rounded-[18px] min-h-[190px] my-8 relative">
      <Image
        className="rounded-[18px]"
        src="/assets/images/profile.jpeg"
        alt="Profile alt"
        width={100}
        height={100}
        style={{ height: "190px", width: "100%", objectFit: "cover" }}
      />
      {user && (
        <div className="absolute p-4 bottom-0">
          <p className="font-bold">
            {user?.email}, <span>{age}</span>
          </p>
          <p className="mt-1 text-[13px]">Male</p>
          {(user.horoscope || user.zodiac) && (
            <div className="mt-2 flex gap-x-3 text-sm">
              <div className="flex gap-x-2 bg-black rounded-full px-3 py-1">
                {user?.horoscope}
              </div>
              <div className="flex gap-x-2 bg-black rounded-full px-3 py-1">
                {user?.zodiac}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
