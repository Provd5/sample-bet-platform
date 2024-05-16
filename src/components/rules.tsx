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
  "Wpisowe 30 zł na nagrodę dla pierwszych trzech miejsc.",
  "Za poprawne wytypowanie goli jednej ze stron: +0.5pkt.",
  "Za poprawne wytypowanie zwycięzcy: +1pkt.",
  "Za poprawne wytypowanie dokładnego wyniku: +2pkt.",
  "Za poprawne wytypowanie dokładnego wyniku i zwycięzcy: +3pkt.",
  "Przyznane punkty za mecz finałowy mnożone są x3, za mecze w półfinałach x2.5, w ćwierćfinałach x2, w 1/8 x1.5.",
  "Dokładny wynik można postawić niezależnie na kogo obstawiło się zwycięzce.",
  "Wygrywa osoba która zgarnie najwięcej punktów, w przypadku remisu rozstrzyga najwięcej trafień dokładnych wyników.",
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
              <p className="py-1 leading-tight" key={index}>
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
