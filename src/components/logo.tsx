import type { FC } from "react";
import Image from "next/image";

import logo from "../../public/logo.svg";

interface LogoProps {
  size?: "default" | "lg";
  className?: string;
}

export const Logo: FC<LogoProps> = ({ size = "default", className }) => {
  const sizeNumber = {
    default: 48,
    lg: 192,
  };

  return (
    <Image
      src={logo as string}
      alt="logo"
      height={sizeNumber[size]}
      width={sizeNumber[size]}
      className={className}
      priority
    />
  );
};
