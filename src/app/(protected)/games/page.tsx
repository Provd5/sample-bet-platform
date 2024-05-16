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
        fallback={<TableLoader height={82} innerHeight={54} />}
      >
        <GamesTable />
      </Suspense>
    </div>
  );
}
