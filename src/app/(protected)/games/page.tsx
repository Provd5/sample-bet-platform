import { Suspense } from "react";

import { GamesTable } from "~/components/Games/games-table";
import { GamesTableLoader } from "~/components/Loaders/games-table-loader";

export function generateMetadata() {
  return {
    title: "Mecze",
  };
}

export default function GamesPage() {
  return (
    <div>
      <Suspense key={"games-table-suspense"} fallback={<GamesTableLoader />}>
        <GamesTable />
      </Suspense>
    </div>
  );
}
