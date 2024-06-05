import type { FC } from "react";
import { Info } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

const rules = [
  "Za poprawne wytypowanie zwycięzcy: +1pkt.",
  "Za poprawne wytypowanie dokładnego wyniku: +2pkt.",
  "Dokładny wynik można postawić niezależnie na kogo obstawiło się zwycięzce.",
  "Zakład bonusowy: Za wytypowanie finalisty: +3pkt (max 6pkt).",
  "Mecze będą rozliczne po zakończeniu regulaminowego czasu wraz z doliczonym czasem. Dogrywka oraz rzuty karne nie są brane pod uwagę.",
  "Wygrywa osoba która zgarnie najwięcej punktów, w przypadku remisu rozstrzyga najwięcej trafień dokładnych wyników.",
  "Zakład bonusowy należy postawić przed rozpoczęciem turnieju. Zakłady na mecze do planowego rozpoczęcia meczu.",
];

export const Rules: FC = ({}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Info className="size-[1.2rem]" />
          <span className="sr-only">Zasady</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Zasady:</AlertDialogTitle>
          <AlertDialogDescription>
            {rules.map((rule, index) => (
              <p className="py-1 leading-tight" key={`Rules-rules-${index}`}>
                <span className="font-bold">{`${index + 1}. `}</span>
                {rule}
              </p>
            ))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Zamknij</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
