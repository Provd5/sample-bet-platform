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
  "Stawiamy zwycięzca meczu + bonus (dokładny wynik)",
  "Za wytypowanie zwycięzcy 1 pkt, a za bonus 2 pkt",
  "Dokładny wynik można postawić niezależnie na kogo obstawiło się zwycięzce",
  "Wygrywa osoba która zgarnie najwięcej punktów, a w przypadku remisu rozstrzyga najwięcej trafień dokładnych wyników",
  "Wpisowe 30 zł na nagrodę dla pierwszych trzech miejsc",
  "W Finale i Półfinałach punkty liczą się x2",
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
