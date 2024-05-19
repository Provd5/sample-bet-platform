import { type FC } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Separator } from "~/components/ui/separator";

import { GameTeam } from "../game-team";
import { BetCarouselItem } from "./bet-carousel-item";

interface BetUsersProps {
  game: GameInterface;
  bets: BetInterface[];
}

export const BetUsers: FC<BetUsersProps> = ({ game, bets }) => {
  const betsForCurrentGame = bets.filter((bet) => bet.game_id === game.id);

  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>Tak obstawili inni</AlertDialogTitle>
      </AlertDialogHeader>
      <div className="flex flex-col sm:flex-row gap-x-2 gap-y-4 sm:items-center justify-between mb-3 mt-1">
        {betsForCurrentGame.length > 0 ? (
          <Carousel orientation="vertical" opts={{ dragFree: true }}>
            <CarouselContent className="max-h-[400px] cursor-grab">
              {betsForCurrentGame.map((userBet) => (
                <BetCarouselItem
                  key={`BetUsers-CarouselItem-${userBet.id}`}
                  game={game}
                  userBet={userBet}
                />
              ))}
            </CarouselContent>
            <CarouselPrevious className="top-auto -bottom-14 left-3" />
            <CarouselNext className="top-auto -bottom-14 left-12" />
          </Carousel>
        ) : (
          <p className="mt-1.5">Nikt nie obstawił tego meczu ☹️</p>
        )}

        <Separator className="sm:hidden" />

        <div className="flex flex-col gap-2 items-end">
          <div className="flex items-center gap-3">
            <GameTeam
              teamName={game.homeTeamName}
              teamIcon={game.homeTeamIcon}
              teamSide={"HOME_TEAM"}
              gameData={{
                winner: game.regularTimeScore?.winner,
                status: game.status,
              }}
              secondary
            />
            <p className="text-xl font-bold">
              {game.regularTimeScore?.home || 0}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <GameTeam
              teamName={game.awayTeamName}
              teamIcon={game.awayTeamIcon}
              teamSide={"AWAY_TEAM"}
              gameData={{
                winner: game.regularTimeScore?.winner,
                status: game.status,
              }}
              secondary
            />
            <p className="text-xl font-bold">
              {game.regularTimeScore?.away || 0}
            </p>
          </div>
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Zamknij</AlertDialogCancel>
      </AlertDialogFooter>
    </div>
  );
};
