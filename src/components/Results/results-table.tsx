import type { FC } from "react";

import { getAllUsersBets } from "~/lib/actions/game-bets";
import { getAllGames } from "~/lib/actions/games";
import { readSessionId } from "~/lib/auth/session";

import { DataTable } from "../data-table";
import { TableHeader } from "../table-header";
import { ResultCard } from "./Result/result-card";
import resultsCalculator from "./results-calculator";

export const ResultsTable: FC = async ({}) => {
  const [games, bets, session] = await Promise.all([
    getAllGames(),
    getAllUsersBets(),
    readSessionId(),
  ]);

  const results = resultsCalculator(games, bets);

  return (
    <DataTable isData={!!games.length}>
      <>
        <TableHeader />
        {results.length > 0 ? (
          results.map((result) => (
            <ResultCard
              key={`ResultsTable-ResultCard-${result.userId}`}
              sessionId={session?.userId}
              result={result}
            />
          ))
        ) : (
          <h1 className="text-center text-xl p-3">
            Nikt jeszcze nic nie obstawił ☹️
          </h1>
        )}
      </>
    </DataTable>
  );
};
