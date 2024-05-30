import { type FC } from "react";

import { type BetFinalsInterface } from "~/types/teams";

import { DataLoadError } from "~/components/data-load-error";
import { FINALS_BETTING_CLOSING_DATE } from "~/constants/current-event";
import { getAllUsersFinalsBets } from "~/lib/actions/finals-bets";
import { getAllTeams } from "~/lib/actions/teams";

import { BetFinalsForm } from "./bet-finals-form";
import { BetFinalsUsers } from "./bet-finals-users";

interface BetFinalsProps {
  sessionBetFinals: BetFinalsInterface | null;
}

export const BetFinals: FC<BetFinalsProps> = async ({ sessionBetFinals }) => {
  const isFinished = Date.now() > FINALS_BETTING_CLOSING_DATE;

  if (isFinished) {
    const finalsBets = await getAllUsersFinalsBets();

    return <BetFinalsUsers finalsBets={finalsBets} />;
  } else {
    const teams = await getAllTeams();
    if (!teams.length) return <DataLoadError />;

    return <BetFinalsForm teams={teams} sessionBetFinals={sessionBetFinals} />;
  }
};
