import type { FC } from "react";
import { CircleEqual } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

import { GameTeam } from "../game-team";

interface BetTeamProps {
  homeTeamName: string;
  homeTeamIcon: string;
  awayTeamName: string;
  awayTeamIcon: string;
}

export const BetTeam: FC<BetTeamProps> = ({
  homeTeamName,
  homeTeamIcon,
  awayTeamName,
  awayTeamIcon,
}) => {
  return (
    <ToggleGroup type="single" className="flex-col justify-between">
      <h1 className="sm:self-end self-center text-sm text-gray-500">
        Wygrany:
      </h1>
      <div className="flex flex-col gap-1 max-sm:w-full">
        <ToggleGroupItem className="w-full" value="HOME_TEAM">
          <GameTeam
            teamName={homeTeamName}
            teamIcon={homeTeamIcon}
            teamSide={"HOME_TEAM"}
            secondary
          />
        </ToggleGroupItem>
        <ToggleGroupItem className="w-full" value="AWAY_TEAM">
          <GameTeam
            teamName={awayTeamName}
            teamIcon={awayTeamIcon}
            teamSide={"AWAY_TEAM"}
            secondary
          />
        </ToggleGroupItem>
        <ToggleGroupItem
          className="w-full justify-center sm:justify-end gap-2"
          value="DRAW"
        >
          Remis <CircleEqual className="size-[30px]" />
        </ToggleGroupItem>
      </div>
    </ToggleGroup>
  );
};
