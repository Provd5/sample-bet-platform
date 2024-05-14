import type { FC } from "react";

import { fetchData } from "../../../data/fetcher";
import { DataLoadError } from "../data-load-error";
import { BetModal } from "./Game/Bet/bet-modal";

export const GamesTable: FC = async ({}) => {
  const games = await fetchData();

  return (
    <>
      <div className="py-12 flex-col flex items-center">
        {!games ? (
          <DataLoadError />
        ) : (
          games.map((game) => <BetModal key={game.id} game={game} />)
        )}
      </div>
    </>
  );
};
