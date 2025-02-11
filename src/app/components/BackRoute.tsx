"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BackRouteProps {
  link: string;
}

const BackRoute: FC<BackRouteProps> = ({ link }) => {
  return (
    <Link href={link} className="flex gap-x-4 cursor-pointer">
      <Image
        src="/assets/icons/back.svg"
        alt="Back alt"
        style={{ width: "10px", height: "16px" }}
        width={10}
        height={16}
      />
      <p className="font-bold">Back</p>
    </Link>
  );
};

export default BackRoute;
