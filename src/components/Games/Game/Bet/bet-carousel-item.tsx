import type { FC } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import { CarouselItem } from "~/components/ui/carousel";
import { translateConstantsToPolish } from "~/lib/utils";

interface BetCarouselItemProps {
  game: GameInterface;
  userBet: BetInterface;
}

export const BetCarouselItem: FC<BetCarouselItemProps> = ({
  game,
  userBet,
}) => {
  const homeGoalsHit = game.regularTimeScore?.home === userBet.home_goals;
  const awayGoalsHit = game.regularTimeScore?.away === userBet.away_goals;
  const winnerHit = game.regularTimeScore?.winner === userBet.winner;

  return (
    <CarouselItem className="basis-1/3 select-none">
      <div className="flex flex-col justify-center">
        <h1 className="truncate max-w-40">{userBet.username}</h1>
        <div className="flex flex-col text-sm">
          <p className="text-gray-500">
            Gole gospodarzy:{" "}
            <span
              className={homeGoalsHit ? "text-green-600" : "text-destructive"}
            >
              {userBet.home_goals}
            </span>
          </p>
          <p className="text-gray-500">
            Gole gości:{" "}
            <span
              className={awayGoalsHit ? "text-green-600" : "text-destructive"}
            >
              {userBet.away_goals}
            </span>
          </p>
          <p className="text-gray-500">
            Zwycięzca:{" "}
            <span className={winnerHit ? "text-green-600" : "text-destructive"}>
              {userBet.winner === ""
                ? "Nie obstawiono"
                : translateConstantsToPolish(userBet.winner)}
            </span>
          </p>
        </div>
      </div>
    </CarouselItem>
  );
};
