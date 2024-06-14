import type { FC } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

import { type TeamBetInterface, type TeamInterface } from "~/types/teams";

import { Button } from "~/components/ui/button";
import { CarouselItem } from "~/components/ui/carousel";
import { cn } from "~/lib/utils";

interface TeamCarouselItemProps {
  team: TeamInterface;
  setValueFunc: (values: TeamBetInterface) => void;
  betState: TeamBetInterface[];
}

export const TeamCarouselItem: FC<TeamCarouselItemProps> = ({
  team,
  setValueFunc,
  betState,
}) => {
  const isInBet = betState.some((bet) => bet.teamId === team.id);
  const canBet = betState.length < 2 && betState.length >= 0;

  return (
    <CarouselItem className="select-none">
      <div className="flex items-center gap-3">
        {canBet || isInBet ? (
          <Button
            className="size-9"
            variant="outline"
            type="button"
            onClick={() =>
              setValueFunc({ teamId: team.id, teamName: team.name })
            }
          >
            {isInBet ? (
              <Minus className="size-5 shrink-0" />
            ) : (
              <Plus className="size-5 shrink-0" />
            )}
          </Button>
        ) : (
          <div className="size-9 shrink-0" />
        )}
        <div
          className={cn("flex w-full rounded-sm", isInBet && "bg-gray-500/10")}
        >
          <div className="flex items-center gap-3 px-3 py-1.5">
            <Image
              alt={`${team.name} Icon`}
              src={team.icon}
              height={30}
              width={30}
              className="size-[30px] object-contain"
            />
            <h1 className="max-w-[260px] truncate">{`${team.name} (${team.nameCode})`}</h1>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};
