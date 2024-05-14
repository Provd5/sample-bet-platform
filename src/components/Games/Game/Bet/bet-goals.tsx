import type { FC } from "react";

import { GoalsInput } from "./goals-input";

interface BetGoalsProps {
  homeTeamName: string;
  homeTeamIcon: string;
  awayTeamName: string;
  awayTeamIcon: string;
}

export const BetGoals: FC<BetGoalsProps> = ({
  homeTeamName,
  homeTeamIcon,
  awayTeamName,
  awayTeamIcon,
}) => {
  return (
    <div className="flex flex-col gap-1 justify-between">
      <h1 className="text-sm text-gray-500">Dokładny wynik:</h1>
      <div className="flex flex-col gap-2">
        <GoalsInput
          teamIcon={homeTeamIcon}
          teamName={homeTeamName}
          teamSide="HOME_TEAM"
        />
        <GoalsInput
          teamIcon={awayTeamIcon}
          teamName={awayTeamName}
          teamSide="AWAY_TEAM"
        />
      </div>
    </div>
  );
};
