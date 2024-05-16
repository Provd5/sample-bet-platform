"use client";

import { type FC, useState } from "react";
import { type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type betSchemaType } from "~/lib/validatorSchemas/bet";

interface GoalsInputProps {
  register: UseFormRegister<betSchemaType>;
  setValue: UseFormSetValue<betSchemaType>;
  teamName: string;
  teamIcon: string;
  teamSide: "HOME_TEAM" | "AWAY_TEAM";
  userGoalsData: number;
}

export const GoalsInput: FC<GoalsInputProps> = ({
  register,
  setValue,
  teamName,
  teamIcon,
  teamSide,
  userGoalsData,
}) => {
  const [valueState, setValueState] = useState(userGoalsData);
  const registerTeam = teamSide === "AWAY_TEAM" ? "away" : "home";

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex gap-1 items-center">
        <Image src={teamIcon} alt={`${teamName} icon`} width={20} height={20} />
        <p className="text-sm">
          {teamSide === "AWAY_TEAM" ? "Gole gości:" : "Gole gospodarzy:"}
        </p>
      </div>
      <div className="flex gap-1 items-center">
        <Button
          type="button"
          variant={"outline"}
          className="size-9"
          onClick={() => (
            setValueState((prev) => (prev > 0 ? prev - 1 : 0)),
            setValue(registerTeam, valueState > 0 ? valueState - 1 : 0)
          )}
        >
          <Minus className="size-5 shrink-0" />
        </Button>
        <Input
          {...register(registerTeam, { valueAsNumber: true })}
          value={valueState}
          disabled
          type="number"
          className="w-14"
        />
        <Button
          type="button"
          variant={"outline"}
          className="size-9"
          onClick={() => (
            setValueState((prev) => prev + 1),
            setValue(registerTeam, valueState + 1)
          )}
        >
          <Plus className="size-5 shrink-0" />
        </Button>
      </div>
    </div>
  );
};
