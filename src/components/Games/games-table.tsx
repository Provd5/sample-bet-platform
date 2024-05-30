import { type FC, Suspense } from "react";

import { getSessionBets } from "~/lib/actions/game-bets";
import { getAllGames } from "~/lib/actions/games";

import { DataTable } from "../data-table";
import { FinalsLoader } from "../Loaders/finals-loader";
import { Finals } from "./Finals/finals";
import { BetModal } from "./Game/Bet/bet-modal";
import { GamesSwitcher } from "./games-switcher";

export const GamesTable: FC = async ({}) => {
  const [games, sessionBets] = await Promise.all([
    getAllGames(),
    getSessionBets(),
  ]);

  return (
    <DataTable isData={!!games.length}>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-end justify-between gap-3 py-2 sm:flex-row">
        <GamesSwitcher />
        <Suspense key={"finals-suspense"} fallback={<FinalsLoader />}>
          <Finals />
        </Suspense>
      </div>
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
