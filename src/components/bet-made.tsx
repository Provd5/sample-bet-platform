import type { FC } from "react";
import { CircleCheckBig } from "lucide-react";

export const BetMade: FC = ({}) => {
  return (
    <p className="flex gap-1 items-center">
      Obstawiono! <CircleCheckBig className="size-4 shrink-0" />
    </p>
  );
};
