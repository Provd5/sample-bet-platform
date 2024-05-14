import type { FC } from "react";

import { type GameInterface } from "~/types/games";

import { translateConstantsToPolish } from "~/lib/utils";

import { GameDate } from "./game-date";
import { GameTeam } from "./game-team";

interface GameCardProps {
  game: GameInterface;
}

export const GameCard: FC<GameCardProps> = ({ game }) => {
  return (
    <div className="flex w-full justify-center px-2 py-3.5 hover:bg-gray-500/10 cursor-pointer">
      <div className="flex items-center gap-3 md:gap-6 flex-col md:flex-row">
        <div className="flex flex-col items-center">
          <p className="text-sm">{translateConstantsToPolish(game.status)}</p>
          <div className="flex items-center gap-3 md:gap-6">
            <GameTeam
              teamName={game.homeTeamName}
              teamIcon={game.homeTeamIcon}
              teamSide={"HOME_TEAM"}
              winner={game.regularTimeScore?.winner}
            />
            <div className="flex flex-col gap-2 items-center">
              <div className="flex gap-1 text-xl">
                <p>{game.regularTimeScore?.home || 0}</p> -{" "}
                <p>{game.regularTimeScore?.away || 0}</p>
              </div>
            </div>
            <GameTeam
              teamName={game.awayTeamName}
              teamIcon={game.awayTeamIcon}
              teamSide={"AWAY_TEAM"}
              winner={game.regularTimeScore?.winner}
            />
          </div>
        </div>
        <div className="flex md:flex-col gap-x-3 self-end md:items-start items-end">
          <div>{translateConstantsToPolish(game.stage)}</div>
          <GameDate timestamp={game.timestamp} />
        </div>
      </div>
    </div>
  );
};
