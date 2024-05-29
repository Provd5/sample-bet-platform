import { type FC, Suspense } from "react";

import { getSessionBets } from "~/lib/actions/game-bets";
import { getAllGames } from "~/lib/actions/games";

import { DataTable } from "../data-table";
import { FinalsLoader } from "../Loaders/finals-loader";
import { Finals } from "./Finals/finals";
import { BetModal } from "./Game/Bet/bet-modal";

export const GamesTable: FC = async ({}) => {
  const [games, sessionBets] = await Promise.all([
    getAllGames(),
    getSessionBets(),
  ]);

  return (
    <DataTable isData={!!games.length}>
      <Suspense key={"finals-suspense"} fallback={<FinalsLoader />}>
        <Finals />
      </Suspense>
      {games.map((game) => {
        const sessionBet = sessionBets.find((bet) => bet.gameId === game.id);

        return (
          <BetModal
            key={`GamesTable-BetModal-${game.id}`}
            game={game}
            sessionBet={sessionBet}
          />
        );
      })}
    </DataTable>
  );
};
