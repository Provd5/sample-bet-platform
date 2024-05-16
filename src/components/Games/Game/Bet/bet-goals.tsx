import type { FC } from "react";
import { type UseFormRegister, type UseFormSetValue } from "react-hook-form";

import { type betSchemaType } from "~/lib/validatorSchemas/bet";

import { GoalsInput } from "./goals-input";

interface BetGoalsProps {
  register: UseFormRegister<betSchemaType>;
  setValue: UseFormSetValue<betSchemaType>;
  homeTeamName: string;
  homeTeamIcon: string;
  awayTeamName: string;
  awayTeamIcon: string;
  userData: { away_goals: number; home_goals: number };
}

export const BetGoals: FC<BetGoalsProps> = ({
  register,
  setValue,
  homeTeamName,
  homeTeamIcon,
  awayTeamName,
  awayTeamIcon,
  userData,
}) => {
  return (
    <div className="flex flex-col gap-1 justify-between">
      <h1 className="text-sm text-gray-500 sm:self-end self-center">
        Dokładny wynik:
      </h1>
      <div className="flex flex-col gap-2">
        <GoalsInput
          setValue={setValue}
          register={register}
          teamIcon={homeTeamIcon}
          teamName={homeTeamName}
          teamSide="HOME_TEAM"
          userGoalsData={userData.home_goals}
        />
        <GoalsInput
          setValue={setValue}
          register={register}
          teamIcon={awayTeamIcon}
          teamName={awayTeamName}
          teamSide="AWAY_TEAM"
          userGoalsData={userData.away_goals}
        />
      </div>
    </div>
  );
};
