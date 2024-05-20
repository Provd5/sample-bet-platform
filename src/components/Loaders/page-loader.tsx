import type { FC } from "react";
import Image from "next/image";

import logo from "../../../public/logo.svg";

export const PageLoader: FC = ({}) => {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={logo as string}
          alt="logo"
          height={192}
          width={192}
          className="animate-bounce"
        />
      </div>
    </>
  );
};
