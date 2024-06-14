import type { FC } from "react";
import Image from "next/image";

import { cn } from "~/lib/utils";

import logo from "../../public/logo.png";

interface LogoProps {
  size?: "default" | "lg";
  className?: string;
}

export const Logo: FC<LogoProps> = ({ size = "default", className }) => {
  const sizeNumber = {
    default: { w: 48, h: 60 },
    lg: { w: 192, h: 240 },
  };

  return (
    <Image
      src={logo}
      alt="logo"
      width={sizeNumber[size].w}
      height={sizeNumber[size].h}
      className={cn(
        `w-${sizeNumber[size].w} h-${sizeNumber[size].h} object-contain`,
        className,
      )}
      priority
    />
  );
};
