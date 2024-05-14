"use client";

import { type FC, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface GoalsInputProps {
  teamName: string;
  teamIcon: string;
  teamSide: "HOME_TEAM" | "AWAY_TEAM";
}

export const GoalsInput: FC<GoalsInputProps> = ({
  teamName,
  teamIcon,
  teamSide,
}) => {
  const [valueState, setValueState] = useState(0);

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex gap-1 items-center">
        <Image src={teamIcon} alt={`${teamName}-icon`} width={20} height={20} />
        <p className="text-sm">
          {teamSide === "AWAY_TEAM" ? "Gole gości:" : "Gole gospodarzy:"}
        </p>
      </div>
      <div className="flex gap-1 items-center">
        <Button
          variant={"outline"}
          className="size-9"
          onClick={() => setValueState((prev) => (prev > 0 ? prev - 1 : 0))}
        >
          <Minus className="size-5 shrink-0" />
        </Button>
        <Input value={valueState} disabled type="number" className="w-14" />
        <Button
          variant={"outline"}
          className="size-9"
          onClick={() => setValueState((prev) => prev + 1)}
        >
          <Plus className="size-5 shrink-0" />
        </Button>
      </div>
    </div>
  );
};
