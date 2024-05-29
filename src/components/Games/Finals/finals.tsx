import type { FC } from "react";

import { BetMade } from "~/components/bet-made";
import { getSessionFinalsBet } from "~/lib/actions/finals-bets";

import { BetFinalsModal } from "./bet-finals-modal";
import { FinalsTeams } from "./finals-teams";

export const Finals: FC = async ({}) => {
  const sessionBetFinals = await getSessionFinalsBet();

  return (
    <div className="flex justify-end gap-3 px-6 py-2">
      {sessionBetFinals && (
        <div className="flex flex-col items-end text-sm">
          <BetMade />
          <FinalsTeams teams={sessionBetFinals.teamBet} />
        </div>
      )}
      <BetFinalsModal sessionBetFinals={sessionBetFinals} />
    </div>
  );
};
