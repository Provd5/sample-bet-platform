import type { FC } from "react";

import { type BetFinalsInterface } from "~/types/teams";

import { CarouselItem } from "~/components/ui/carousel";

import { FinalsTeams } from "./finals-teams";

interface BetFinalsCarouselItemProps {
  finalsUserBet: BetFinalsInterface;
}

export const BetFinalsCarouselItem: FC<BetFinalsCarouselItemProps> = ({
  finalsUserBet,
}) => {
  return (
    <CarouselItem className="basis-1/3 select-none">
      <div className="flex flex-col justify-center">
        <h1 className="max-w-40 truncate">{finalsUserBet.username}</h1>
        <div className="flex flex-col text-sm">
          <FinalsTeams teams={finalsUserBet.teamBet} />
        </div>
      </div>
    </CarouselItem>
  );
};
