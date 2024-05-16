import { Suspense } from "react";

import { TableLoader } from "~/components/Loaders/table-loader";
import { ResultsTable } from "~/components/Results/results-table";

export function generateMetadata() {
  return {
    title: "Punktacja",
  };
}

export default function ResultsPage() {
  return (
    <div>
      <Suspense
        key={"results-table-suspense"}
        fallback={<TableLoader variant="results" />}
      >
        <ResultsTable />
      </Suspense>
    </div>
  );
}
