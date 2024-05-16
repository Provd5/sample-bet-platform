import type { FC } from "react";

import { getAllGames, getAllUsersBets } from "~/lib/actions/games";
import { readSessionId } from "~/lib/auth/session";

import { DataTable } from "../data-table";
import { TableHeader } from "../table-header";
import { ResultCard } from "./Result/result-card";
import resultsCalculator from "./results-calculator";

export const ResultsTable: FC = async ({}) => {
  const [games, bets, session] = await Promise.all([
    // fetchGames(),
    getAllGames(),
    // fetchBets(),
    getAllUsersBets(),
    readSessionId(),
  ]);

  const results = resultsCalculator(games, bets);

  return (
    <DataTable isData={!!results}>
      <>
        <TableHeader />
        {results.map((result, index) => (
          <ResultCard
            key={`ResultCard-${result.user_id}`}
            sessionId={session?.userId}
            result={result}
            place={index + 1}
          />
        ))}
      </>
    </DataTable>
  );
};
