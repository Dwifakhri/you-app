import Image from "next/image";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const hour = new Date().getHours();
  const min = new Date().getMinutes();

  return (
    <div className="flex justify-between">
      <p className="font-semibold">
        {hour}:{min}
      </p>
      <div className="flex gap-x-1">
        <Image
          src="/assets/icons/signal.svg"
          alt="Signal Logo"
          style={{ width: "18px", height: "12px" }}
          width={18}
          height={12}
          priority
        />
        <Image
          src="/assets/icons/wifi.svg"
          alt="Wifi Logo"
          style={{ width: "16px", height: "12px" }}
          width={16}
          height={12}
          priority
        />
        <Image
          src="/assets/icons/battery.svg"
          alt="Battery Logo"
          style={{ width: "25px", height: "12px" }}
          width={25}
          height={12}
          priority
        />
      </div>
    </div>
  );
};

export default Header;
