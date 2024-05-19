import type { FC } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import { CarouselItem } from "~/components/ui/carousel";
import { getMatchWinnerName } from "~/lib/utils";

interface BetCarouselItemProps {
  game: GameInterface;
  userBet: BetInterface;
}

export const BetCarouselItem: FC<BetCarouselItemProps> = ({
  game,
  userBet,
}) => {
  const accurateScoreHit =
    game.regularTimeScore?.home === userBet.home_goals &&
    game.regularTimeScore?.away === userBet.away_goals;
  const winnerHit = game.regularTimeScore?.winner === userBet.winner;

  return (
    <CarouselItem className="basis-1/3 select-none">
      <div className="flex flex-col justify-center">
        <h1 className="truncate max-w-40">{userBet.username}</h1>
        <div className="flex flex-col text-sm">
          <p className="text-gray-500">
            Wynik:{" "}
            <span
              className={accurateScoreHit ? "text-green-600" : "text-destructive"}
            >
              {userBet.home_goals}-{userBet.away_goals}
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
