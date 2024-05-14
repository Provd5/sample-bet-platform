import type { FC } from "react";

import { dateFormat } from "~/lib/utils";

interface GameDateProps {
  timestamp: number;
}

export const GameDate: FC<GameDateProps> = ({ timestamp }) => {
  return (
    <div className="whitespace-nowrap text-sm text-gray-500 first-letter:uppercase">
      {dateFormat(timestamp)}
    </div>
  );
};
