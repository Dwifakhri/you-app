"use client";

import Image from "next/image";
import { FC, useState, ChangeEvent } from "react";

interface InputPasswordProps {
  value: string;
  placeholder: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputPassword: FC<InputPasswordProps> = ({
  value,
  placeholder,
  handleChange,
}) => {
  const [isPassword, setIsPassword] = useState(true);
  return (
    <div className="relative">
      <input
        className="p-4 rounded-lg mb-4 w-full"
        type={isPassword ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <div
        className="absolute top-0 right-0 mr-5 mt-5 cursor-pointer -scale-x-100"
        onClick={() => setIsPassword(!isPassword)}>
        {isPassword ? (
          <Image
            src="/assets/icons/eye.svg"
            alt="Eye alt"
            width={16}
            height={16}
          />
        ) : (
          <Image
            src="/assets/icons/eye-slice.svg"
            alt="Eye slice alt"
            width={16}
            height={16}
          />
        )}
      </div>
    </div>
  );
};

export default InputPassword;
