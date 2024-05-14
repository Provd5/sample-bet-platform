"use client";

import type { FC } from "react";

import { type GameInterface } from "~/types/games";

import { Separator } from "~/components/ui/separator";

import { BetGoals } from "./bet-goals";
import { BetTeam } from "./bet-team";

interface BetGameProps {
  game: GameInterface;
}

export const BetGame: FC<BetGameProps> = ({ game }) => {
  return (
    <div className="flex flex-col !mb-3">
      <div className="flex flex-col sm:flex-row gap-x-2 gap-y-4 justify-between">
        <BetGoals
          homeTeamName={game.homeTeamName}
          homeTeamIcon={game.homeTeamIcon}
          awayTeamName={game.awayTeamName}
          awayTeamIcon={game.awayTeamIcon}
        />
        <Separator className="sm:hidden" />
        <BetTeam
          homeTeamName={game.homeTeamName}
          homeTeamIcon={game.homeTeamIcon}
          awayTeamName={game.awayTeamName}
          awayTeamIcon={game.awayTeamIcon}
        />
      </div>
    </div>
  );
};
