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
  "Za poprawne wytypowanie zwycięzcy: +1pkt.",
  "Za poprawne wytypowanie dokładnego wyniku: +2pkt.",
  "Dokładny wynik można postawić niezależnie na kogo obstawiło się zwycięzce.",
  "Wygrywa osoba która zgarnie najwięcej punktów, w przypadku remisu rozstrzyga najwięcej trafień dokładnych wyników.",
];

export const Rules: FC = ({ }) => {
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
