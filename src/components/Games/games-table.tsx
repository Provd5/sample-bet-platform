import type { FC } from "react";

import {
  getAllGames,
  getAllUsersBets,
  getSessionBets,
} from "~/lib/actions/games";

import { DataTable } from "../data-table";
import { BetModal } from "./Game/Bet/bet-modal";

export const GamesTable: FC = async ({}) => {
  const [games, bets, sessionBets] = await Promise.all([
    getAllGames(),
    getAllUsersBets(),
    getSessionBets(),
  ]);

  return (
    <DataTable isData={!!games.length && !!bets.length}>
      {games &&
        games.map((game) => {
          const sessionBet = sessionBets.find((bet) => bet.game_id === game.id);

          return (
            <BetModal
              key={`GamesTable-BetModal-${game.id}`}
              sessionBet={sessionBet}
              game={game}
              bets={bets}
            />
          );
        })}
    </DataTable>
  );
};
