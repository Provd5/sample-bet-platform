import { type FC } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Separator } from "~/components/ui/separator";
import { checkGameBetStatus } from "~/lib/utils";

import { ModalCarousel } from "../../modal-carousel";
import { GameTeam } from "../game-team";
import { BetCarouselItem } from "./bet-carousel-item";

interface BetUsersProps {
  game: GameInterface;
  bets: BetInterface[];
}

export const BetUsers: FC<BetUsersProps> = ({ game, bets }) => {
  const sortedBets = bets.sort((a, b) => {
    const ABet = checkGameBetStatus(game, a);
    const BBet = checkGameBetStatus(game, b);

    if (ABet.accurateScoreHit && !BBet.accurateScoreHit) {
      return -1;
    }
    if (ABet.winnerHit && !BBet.winnerHit) {
      return -1;
    }
    if (ABet.scoreInPlay && !BBet.scoreInPlay) {
      return -1;
    }

    return 1;
  });

  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>Tak obstawili inni</AlertDialogTitle>
      </AlertDialogHeader>
      <div className="!my-3 flex flex-col justify-between gap-x-2 gap-y-4 sm:flex-row sm:items-center">
        {bets.length > 0 ? (
          <ModalCarousel>
            {sortedBets.map((userBet) => (
              <BetCarouselItem
                key={`BetUsers-BetCarouselItem-${userBet.id}`}
                game={game}
                userBet={userBet}
              />
            ))}
          </ModalCarousel>
        ) : (
          <p className="mt-1.5">Nikt nie obstawił tego meczu ☹️</p>
        )}

        <Separator className="sm:hidden" />

        <div className="flex flex-col items-end gap-2">
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
