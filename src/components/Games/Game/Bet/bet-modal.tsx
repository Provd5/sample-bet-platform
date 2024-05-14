import type { FC } from "react";

import { type GameInterface } from "~/types/games";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import { GameCard } from "../game-card";
import { BetGame } from "./bet-game";

interface BetModalProps {
  game: GameInterface;
}

export const BetModal: FC<BetModalProps> = ({ game }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <GameCard game={game} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Obstaw ten mecz</AlertDialogTitle>
          <BetGame game={game} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction>Postaw</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
