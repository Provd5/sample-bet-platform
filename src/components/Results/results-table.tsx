import type { FC } from "react";

import { getAllUsersFinalsBets } from "~/lib/actions/finals-bets";
import { getAllUsersBets } from "~/lib/actions/game-bets";
import { getAllGames } from "~/lib/actions/games";
import { readSessionId } from "~/lib/auth/session";

import { DataTable } from "../data-table";
import { TableHeader } from "../table-header";
import resultsCalculator from "./Calculator/results-calculator";
import { ResultCard } from "./Result/result-card";

export const ResultsTable: FC = async ({}) => {
  const [games, bets, finalsBets, session] = await Promise.all([
    getAllGames(),
    getAllUsersBets(),
    getAllUsersFinalsBets(),
    readSessionId(),
  ]);

  const results = resultsCalculator(games, bets, finalsBets);

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
          <h1 className="p-3 text-center text-xl">
            Nikt jeszcze nic nie obstawił ☹️
          </h1>
        )}
      </>
    </DataTable>
  );
};
