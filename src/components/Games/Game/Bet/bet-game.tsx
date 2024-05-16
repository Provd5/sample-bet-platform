"use client";

import { type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, LoaderCircle } from "lucide-react";

import { ERROR_ENUM } from "~/types/errors";
import { type BetInterface, type GameInterface } from "~/types/games";

import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useToast } from "~/components/ui/use-toast";
import { betGame } from "~/lib/actions/games";
import { errorHandler } from "~/lib/error-handler";
import { cn } from "~/lib/utils";
import { betSchema, type betSchemaType } from "~/lib/validatorSchemas/bet";

import { BetGoals } from "./bet-goals";
import { BetTeam } from "./bet-team";

interface BetGameProps {
  game: GameInterface;
  userBet: BetInterface | undefined;
}

export const BetGame: FC<BetGameProps> = ({ game, userBet }) => {
  const { toast } = useToast();
  const isFinished = Date.now() > game.timestamp;

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<betSchemaType>({
    resolver: zodResolver(betSchema),
    defaultValues: {
      home: userBet?.home_goals || 0,
      away: userBet?.away_goals || 0,
      winner: userBet?.winner || "",
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
      <div className="flex flex-col !mb-3">
        <div className="flex flex-col sm:flex-row gap-x-2 gap-y-4 justify-between">
          <BetGoals
            register={register}
            setValue={setValue}
            homeTeamName={game.homeTeamName}
            homeTeamIcon={game.homeTeamIcon}
            awayTeamName={game.awayTeamName}
            awayTeamIcon={game.awayTeamIcon}
            userData={{
              away_goals: userBet?.away_goals || 0,
              home_goals: userBet?.home_goals || 0,
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
              winner: userBet?.winner || "",
            }}
          />
        </div>
        {errors.root && (
          <p className="flex items-center justify-center gap-1 mt-2 text-destructive text-center">
            <CircleAlert className="size-5" /> {errors.root?.message}
          </p>
        )}
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Zamknij</AlertDialogCancel>
        <Button
          disabled={isSubmitting || isFinished}
          type="submit"
          className={cn(
            isSubmitSuccessful && "bg-green-600 hover:bg-green-300 text-white"
          )}
        >
          {isFinished ? "Zakończony" : "Postaw"}
          {isSubmitting && (
            <LoaderCircle className="ml-1 animate-spin size-4" />
          )}
        </Button>
      </AlertDialogFooter>
    </form>
  );
};
