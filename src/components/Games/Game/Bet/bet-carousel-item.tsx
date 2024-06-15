import type { FC } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import { CarouselItem } from "~/components/ui/carousel";
import { cn, getMatchWinnerName } from "~/lib/utils";

interface BetCarouselItemProps {
  game: GameInterface;
  userBet: BetInterface;
}

export const BetCarouselItem: FC<BetCarouselItemProps> = ({
  game,
  userBet,
}) => {
  const accurateScoreHit =
    game.regularTimeScore?.home === userBet.homeGoals &&
    game.regularTimeScore?.away === userBet.awayGoals;
  const scoreInPlay = game.regularTimeScore && (game.status === "IN_PLAY" || game.status === "PAUSED")
    ? game.regularTimeScore?.home <= userBet.homeGoals &&
    game.regularTimeScore?.away <= userBet.awayGoals
    : false;
  const winnerHit = game.regularTimeScore?.winner === userBet.winner;

  return (
    <CarouselItem className="basis-1/3 select-none">
      <div className="flex flex-col justify-center">
        <h1 className="max-w-40 truncate">{userBet.username}</h1>
        <div className="flex flex-col text-sm">
          <p className="text-gray-500">
            Wynik:{" "}
            <span
              className={cn(
                accurateScoreHit
                  ? "text-green-600"
                  : scoreInPlay
                    ? "text-yellow-600"
                    : "text-destructive",
              )}
            >
              {userBet.homeGoals}-{userBet.awayGoals}
            </span>
          </p>
          <p className="text-gray-500">
            Zwycięzca:{" "}
            <span className={winnerHit ? "text-green-600" : "text-destructive"}>
              {getMatchWinnerName(userBet.winner, game)}
            </span>
          </p>
        </div>
      </div>
    </CarouselItem>
  );
};
