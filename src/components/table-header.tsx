import type { FC } from "react";

import { ResultCardItem } from "./Results/Result/result-card-item";

export const TableHeader: FC = ({}) => {
  return (
    <div className="flex justify-center divide-x divide-x-gray-500/10">
      <ResultCardItem className="text-xs pb-3 pt-2">Miejsce</ResultCardItem>
      <ResultCardItem className="text-xs pb-3 pt-2">
        Dokładne wyniki
      </ResultCardItem>
      <ResultCardItem className="text-xs pb-3 pt-2">Punkty</ResultCardItem>
    </div>
  );
};
