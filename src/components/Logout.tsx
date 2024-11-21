"use client";

import Image from "next/image";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    router.push("/auth/login");
  };

  return (
    <div className="relative text-left">
      <button onClick={() => setIsOpen(!isOpen)}>
        <Image
          src="/assets/icons/dot3.svg"
          alt="Back alt"
          width={16}
          height={16}
          style={{ width: "auto", height: "auto" }}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-bgDark border border-gray-300 rounded-md shadow-lg z-50">
          <ul className="py-1">
            <li onClick={handleLogout}>
              <button className="block px-4 py-2 text-sm text-white">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Logout;
