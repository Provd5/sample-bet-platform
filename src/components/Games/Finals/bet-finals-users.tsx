import type { FC } from "react";

import { type BetFinalsInterface } from "~/types/teams";

import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

import { ModalCarousel } from "../modal-carousel";
import { BetFinalsCarouselItem } from "./bet-finals-carousel-item";

interface BetFinalsUsersProps {
  finalsBets: BetFinalsInterface[];
}

export const BetFinalsUsers: FC<BetFinalsUsersProps> = ({ finalsBets }) => {
  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>Tak obstawili inni</AlertDialogTitle>
      </AlertDialogHeader>
      <div className="!my-3 flex flex-col">
        {finalsBets.length > 0 ? (
          <ModalCarousel>
            {finalsBets.map((finalsUserBet) => (
              <BetFinalsCarouselItem
                key={`BetFinalsUsers-BetCarouselItem-${finalsUserBet.id}`}
                finalsUserBet={finalsUserBet}
              />
            ))}
          </ModalCarousel>
        ) : (
          <p className="mt-1.5">Nikt jeszcze nie obstawił finalistów ☹️</p>
        )}
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Zamknij</AlertDialogCancel>
      </AlertDialogFooter>
    </div>
  );
};
