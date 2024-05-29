"use client";

import { type FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";

import { ERROR_ENUM } from "~/types/errors";
import { type BetInterface, type GameInterface } from "~/types/games";

import { ButtonLoadingSpinner } from "~/components/Loaders/button-loading-spinner";
import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useToast } from "~/components/ui/use-toast";
import { betGame } from "~/lib/actions/game-bets";
import { errorHandler } from "~/lib/error-handler";
import { cn } from "~/lib/utils";
import { betSchema, type betSchemaType } from "~/lib/validatorSchemas/bet";

import { BetGoals } from "./bet-goals";
import { BetTeam } from "./bet-team";

interface BetGameFormProps {
  game: GameInterface;
  sessionBet: BetInterface | undefined;
}

export const BetGameForm: FC<BetGameFormProps> = ({ game, sessionBet }) => {
  const { toast } = useToast();

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
  } = useForm<betSchemaType>({
    resolver: zodResolver(betSchema),
    defaultValues: {
      home: sessionBet?.homeGoals || 0,
      away: sessionBet?.awayGoals || 0,
      winner: sessionBet?.winner || "",
    },
  });

  const onSubmit = handleSubmit(async (values: betSchemaType) => {
    try {
      const res = await betGame(values, {
        gameId: game.id,
        stage: game.stage,
        timestamp: game.timestamp,
      });

      if (!res.success) {
        setError("root", { message: res.errorMsg });
      }

      if (res.success) {
        toast({
          title: "Pomyślnie obstawiono mecz ✅",
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
        <AlertDialogTitle>Obstaw ten mecz</AlertDialogTitle>
      </AlertDialogHeader>
      <div className="!mb-3 flex flex-col">
        <div className="flex flex-col justify-between gap-x-2 gap-y-4 sm:flex-row">
          <BetGoals
            register={register}
            setValue={setValue}
            homeTeamName={game.homeTeamName}
            homeTeamIcon={game.homeTeamIcon}
            awayTeamName={game.awayTeamName}
            awayTeamIcon={game.awayTeamIcon}
            userData={{
              awayGoals: sessionBet?.awayGoals || 0,
              homeGoals: sessionBet?.homeGoals || 0,
            }}
          />
          <Separator className="sm:hidden" />
          <BetTeam
            register={register}
            setValue={setValue}
            homeTeamName={game.homeTeamName}
            homeTeamIcon={game.homeTeamIcon}
            awayTeamName={game.awayTeamName}
            awayTeamIcon={game.awayTeamIcon}
            userData={{
              winner: sessionBet?.winner || "",
            }}
          />
        </div>
        {errors.root && (
          <p className="mt-2 flex items-center justify-center gap-1 text-center text-destructive">
            <CircleAlert className="size-5" /> {errors.root?.message}
          </p>
        )}
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel ref={closeButtonRef}>Zamknij</AlertDialogCancel>
        <Button
          disabled={isSubmitting || !isDirty}
          type="submit"
          className={cn(
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
