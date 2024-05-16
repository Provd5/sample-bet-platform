import type { FC } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import { GameCard } from "../game-card";
import { BetGame } from "./bet-game";

interface BetModalProps {
  game: GameInterface;
  userBets: BetInterface[];
}

export const BetModal: FC<BetModalProps> = ({ game, userBets }) => {
  const userBet = userBets.find((bet) => bet.game_id === game.id);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <GameCard game={game} userBet={userBet} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <BetGame game={game} userBet={userBet} />
      </AlertDialogContent>
    </AlertDialog>
  );
};
