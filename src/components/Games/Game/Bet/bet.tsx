import type { FC } from "react";

import { type BetInterface, type GameInterface } from "~/types/games";

import { getGameBets } from "~/lib/actions/game-bets";

import { BetGameForm } from "./bet-game-form";
import { BetUsers } from "./bet-users";

interface BetProps {
  sessionBet: BetInterface | undefined;
  game: GameInterface;
}

export const Bet: FC<BetProps> = async ({ game, sessionBet }) => {
  const notStarted = game.status === "TIMED" || Date.now() <= game.timestamp;

  if (notStarted) {
    return <BetGameForm game={game} sessionBet={sessionBet} />;
  } else {
    const bets = await getGameBets(game.id);

    return <BetUsers game={game} bets={bets} />;
  }
};
