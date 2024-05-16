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
        fallback={
          <TableLoader className="mt-[36px]" height={77} innerHeight={56} />
        }
      >
        <ResultsTable />
      </Suspense>
    </div>
  );
}
