import type { FC } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import { GameCard } from "../game-card";
import { BetGame } from "./bet-game";
import { BetUsers } from "./bet-users";

interface BetModalProps {
  sessionBet: BetInterface | undefined;
  game: GameInterface;
  bets: BetInterface[];
}

export const BetModal: FC<BetModalProps> = ({ sessionBet, game, bets }) => {
  const notStarted = game.status === "TIMED";

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <GameCard game={game} sessionBet={sessionBet} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        {notStarted ? (
          <BetGame game={game} sessionBet={sessionBet} />
        ) : (
          <BetUsers game={game} bets={bets} />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
