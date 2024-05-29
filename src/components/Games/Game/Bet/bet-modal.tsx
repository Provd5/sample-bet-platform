import { type FC, Suspense } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import { ModalContentLoader } from "~/components/Loaders/modal-content-loader";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import { GameCard } from "../game-card";
import { Bet } from "./bet";

interface BetModalProps {
  sessionBet: BetInterface | undefined;
  game: GameInterface;
}

export const BetModal: FC<BetModalProps> = ({ sessionBet, game }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <GameCard game={game} sessionBet={sessionBet} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Suspense key={"bet-suspense"} fallback={<ModalContentLoader />}>
          <Bet game={game} sessionBet={sessionBet} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
