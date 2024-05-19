"use client";

import { type FC } from "react";
import { type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import { CircleEqual } from "lucide-react";

import { Input } from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { type betSchemaType } from "~/lib/validatorSchemas/bet";

import { GameTeam } from "../game-team";

interface BetTeamProps {
  register: UseFormRegister<betSchemaType>;
  setValue: UseFormSetValue<betSchemaType>;
  homeTeamName: string;
  homeTeamIcon: string;
  awayTeamName: string;
  awayTeamIcon: string;
  userData: { winner: betSchemaType["winner"] };
}

export const BetTeam: FC<BetTeamProps> = ({
  register,
  setValue,
  homeTeamName,
  homeTeamIcon,
  awayTeamName,
  awayTeamIcon,
  userData,
}) => {
  return (
    <ToggleGroup
      type="single"
      className="flex-col justify-between"
      onValueChange={(value: betSchemaType["winner"]) => {
        value
          ? setValue("winner", value, { shouldDirty: true })
          : setValue("winner", "", { shouldDirty: true });
      }}
      defaultValue={userData.winner}
    >
      <Input
        {...register("winner")}
        disabled
        value={userData.winner}
        className="hidden"
      />
      <h1 className="sm:self-end self-center text-sm text-gray-500">
        Wygrany:
      </h1>
      <div className="flex flex-col gap-1 max-sm:w-full">
        <ToggleGroupItem type="button" className="w-full" value="HOME_TEAM">
          <GameTeam
            teamName={homeTeamName}
            teamIcon={homeTeamIcon}
            teamSide={"HOME_TEAM"}
            secondary
          />
        </ToggleGroupItem>
        <ToggleGroupItem type="button" className="w-full" value="AWAY_TEAM">
          <GameTeam
            teamName={awayTeamName}
            teamIcon={awayTeamIcon}
            teamSide={"AWAY_TEAM"}
            secondary
          />
        </ToggleGroupItem>
        <ToggleGroupItem
          type="button"
          className="w-full justify-center sm:justify-end gap-2"
          value="DRAW"
        >
          Remis <CircleEqual className="size-[30px]" />
        </ToggleGroupItem>
      </div>
    </ToggleGroup>
  );
};
