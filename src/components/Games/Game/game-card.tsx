import type { FC } from "react";
import { CircleCheckBig } from "lucide-react";

import { type GameInterface } from "~/types/games";

import { cn, translateConstantsToPolish } from "~/lib/utils";

import { GameDate } from "./game-date";
import { GameTeam } from "./game-team";

interface GameCardProps {
  game: GameInterface;
  isSessionBet: boolean;
}

export const GameCard: FC<GameCardProps> = ({ game, isSessionBet }) => {
  return (
    <div className="flex w-full justify-center px-2 pt-3 pb-4 hover:bg-gray-500/10 cursor-pointer hover:scale-105 transition-transform">
      <div className="flex items-center gap-3 md:gap-6 flex-col md:flex-row">
        <div className="flex flex-col items-center">
          <p className={cn(
            "text-sm",
            (game.status === "IN_PLAY" || game.status === "PAUSED") &&
            "text-red-500"
          )}>{translateConstantsToPolish(game.status)}</p>
          <div className="flex items-center gap-3 md:gap-6">
            <GameTeam
              teamName={game.homeTeamName}
              teamIcon={game.homeTeamIcon}
              teamSide={"HOME_TEAM"}
              winner={game.regularTimeScore?.winner}
            />
            <div className="flex flex-col gap-2 items-center">
              <div className={cn(
                "flex gap-1 text-xl",
                (game.status === "IN_PLAY" || game.status === "PAUSED") &&
                "text-red-500"
              )}>
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
        <div className="flex md:flex-col gap-x-3 self-end md:items-start items-end w-full md:w-fit justify-between md:justify-start">
          <div className="flex gap-x-3 md:flex-row flex-col">
            <p
              className={cn(
                "self-start",
                game.stage === "FINAL" &&
                "font-semibold dark:text-orange-500 text-orange-600",
                game.stage === "SEMI_FINALS" &&
                "font-semibold dark:text-cyan-400 text-cyan-600",
                game.stage === "QUARTER_FINALS" && "font-semibold"
              )}
            >
              {translateConstantsToPolish(game.stage)}
            </p>
            {isSessionBet && (
              <p className="flex gap-1 items-center text-sm -mt-1.5 md:-mt-0">
                Obstawiono! <CircleCheckBig className="size-4 shrink-0" />
              </p>
            )}
          </div>
          <GameDate timestamp={game.timestamp} />
        </div>
      </div>
    </div>
  );
};
