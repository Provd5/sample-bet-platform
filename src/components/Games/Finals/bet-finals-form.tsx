"use client";

import { type FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";

import { ERROR_ENUM } from "~/types/errors";
import { type BetFinalsInterface, type TeamInterface } from "~/types/teams";

import { ButtonLoadingSpinner } from "~/components/Loaders/button-loading-spinner";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { FINALS_BETTING_CLOSING_DATE } from "~/constants/current-event";
import { betFinals } from "~/lib/actions/finals-bets";
import { errorHandler } from "~/lib/error-handler";
import { cn, dateFormat } from "~/lib/utils";
import {
  betFinalsSchema,
  type betFinalsSchemaType,
} from "~/lib/validatorSchemas/bet";

import { Teams } from "./Teams/teams";

interface BetFinalsFormProps {
  teams: TeamInterface[];
  sessionBetFinals: BetFinalsInterface | null;
}

export const BetFinalsForm: FC<BetFinalsFormProps> = ({
  teams,
  sessionBetFinals,
}) => {
  const { toast } = useToast();

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
  } = useForm<betFinalsSchemaType>({
    resolver: zodResolver(betFinalsSchema),
    defaultValues: { teams: [{ teamId: "", teamName: "" }] },
  });

  const onSubmit = handleSubmit(async (values: betFinalsSchemaType) => {
    try {
      const res = await betFinals(values);

      if (!res.success) {
        setError("root", { message: res.errorMsg });
      }

      if (res.success) {
        toast({
          title: "Pomyślnie obstawiono finalistów ✅",
        });
        closeButtonRef.current?.click();
      }
    } catch (error) {
      toast({
        title: ERROR_ENUM.SOMETHING_WENT_WRONG,
        description: errorHandler(error),
        variant: "destructive",
      });
    }
  });

  return (
    <form onSubmit={(e) => (e.preventDefault(), onSubmit())}>
      <AlertDialogHeader>
        <AlertDialogTitle>Obstaw finalistów</AlertDialogTitle>
        <AlertDialogDescription className="!mt-0">
          Do: {dateFormat(FINALS_BETTING_CLOSING_DATE)}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="!my-3 flex flex-col">
        <Input {...register("teams")} disabled className="hidden" />
        <Teams
          setValue={setValue}
          teams={teams}
          sessionBetFinals={sessionBetFinals}
        />
        {errors.root && (
          <p className="mt-2 flex items-center justify-center gap-1 text-center text-destructive">
            <CircleAlert className="size-5" /> {errors.root?.message}
          </p>
        )}
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel
          className="self-end max-sm:w-1/2"
          ref={closeButtonRef}
        >
          Zamknij
        </AlertDialogCancel>
        <Button
          disabled={isSubmitting || !isDirty}
          type="submit"
          className={cn(
            "self-end max-sm:w-1/2",
            isSubmitSuccessful && "bg-green-600 text-white hover:bg-green-300",
          )}
        >
          {"Postaw"}
          {isSubmitting && <ButtonLoadingSpinner />}
        </Button>
      </AlertDialogFooter>
    </form>
  );
};
