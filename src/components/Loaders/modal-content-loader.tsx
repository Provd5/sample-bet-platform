import type { FC } from "react";
import { LoaderCircle } from "lucide-react";

import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export const ModalContentLoader: FC = ({}) => {
  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <div className="h-7 w-2/3 animate-pulse rounded-sm bg-gray-500/10" />
        </AlertDialogTitle>
      </AlertDialogHeader>
      <div className="!my-3 flex min-h-[300px] flex-col items-center justify-center">
        <LoaderCircle className="size-16 shrink-0 animate-spin" />
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Zamknij</AlertDialogCancel>
      </AlertDialogFooter>
    </div>
  );
};
