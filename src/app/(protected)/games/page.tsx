import { Suspense } from "react";

import { GamesTable } from "~/components/Games/games-table";
import { TableLoader } from "~/components/Loaders/table-loader";

export function generateMetadata() {
  return {
    title: "Mecze",
  };
}

export default function GamesPage() {
  return (
    <div>
      <Suspense
        key={"games-table-suspense"}
        fallback={<TableLoader variant="games" />}
      >
        <GamesTable />
      </Suspense>
    </div>
  );
}
