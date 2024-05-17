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
  const isFinished = game.status === "FINISHED";

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <GameCard game={game} isSessionBet={!!sessionBet} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        {isFinished ? (
          <BetUsers game={game} bets={bets} />
        ) : (
          <BetGame game={game} sessionBet={sessionBet} />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
