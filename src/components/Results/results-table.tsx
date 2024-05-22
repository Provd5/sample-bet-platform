import type { FC } from "react";

import { getAllGames, getAllUsersBets } from "~/lib/actions/games";
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
    <DataTable isData={!!games.length && !!bets.length}>
      <>
        <TableHeader />
        {results.map((result) => (
          <ResultCard
            key={`ResultCard-results-${result.user_id}`}
            sessionId={session?.userId}
            result={result}
          />
        ))}
      </>
    </DataTable>
  );
};
