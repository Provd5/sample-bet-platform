import type { FC } from "react";

import { getAllGames, getUserBets } from "~/lib/actions/games";

import { DataTable } from "../data-table";
import { BetModal } from "./Game/Bet/bet-modal";

export const GamesTable: FC = async ({}) => {
  const [games, userBets] = await Promise.all([
    // fetchGames(),
    getAllGames(),
    getUserBets(),
  ]);

  return (
    <DataTable isData={!!games && !!userBets}>
      {games &&
        games.map((game) => (
          <BetModal
            key={`BetModal-${game.id}`}
            game={game}
            userBets={userBets}
          />
        ))}
    </DataTable>
  );
};
