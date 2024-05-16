import type { FC } from "react";
import { Coins } from "lucide-react";

export const PageLoader: FC = ({}) => {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <Coins className="size-24 animate-bounce" />
      </div>
    </>
  );
};
