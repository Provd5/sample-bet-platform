import { type FC, Suspense } from "react";
import { Trophy } from "lucide-react";

import { type BetFinalsInterface } from "~/types/teams";

import { ModalContentLoader } from "~/components/Loaders/modal-content-loader";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import { BetFinals } from "./bet-finals";

interface BetFinalsModalProps {
  sessionBetFinals: BetFinalsInterface | null;
}

export const BetFinalsModal: FC<BetFinalsModalProps> = ({
  sessionBetFinals,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            !!sessionBetFinals && "bg-green-600 text-white hover:bg-green-300",
          )}
        >
          Finaliści
          <Trophy className="ml-1 size-4 shrink-0" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Suspense key={"bet-finals-suspense"} fallback={<ModalContentLoader />}>
          <BetFinals sessionBetFinals={sessionBetFinals} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
