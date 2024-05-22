import type { FC } from "react";
import { ChevronDown, ChevronsDown, ChevronsUp, ChevronUp } from "lucide-react";

import { cn } from "~/lib/utils";

interface ResultPositionAdvanceProps {
  positionAdvance: number;
}

export const ResultPositionAdvance: FC<ResultPositionAdvanceProps> = ({
  positionAdvance,
}) => {
  const positionAdvanceDirection =
    positionAdvance === 1
      ? "up"
      : positionAdvance > 1
      ? "double-up"
      : positionAdvance === -1
      ? "down"
      : positionAdvance < -1
      ? "double-down"
      : null;

  const isIncreased =
    positionAdvanceDirection === "up" ||
    positionAdvanceDirection === "double-up";

  return (
    <div
      className={cn(
        "flex items-center text-sm font-bold",
        isIncreased ? "text-green-600" : "text-destructive"
      )}
    >
      {positionAdvanceDirection === "up" && (
        <ChevronUp className="size-6 shrink-0" />
      )}
      {positionAdvanceDirection === "double-up" && (
        <ChevronsUp className="size-6 shrink-0" />
      )}
      {positionAdvanceDirection === "down" && (
        <ChevronDown className="size-6 shrink-0" />
      )}
      {positionAdvanceDirection === "double-down" && (
        <ChevronsDown className="size-6 shrink-0" />
      )}
      {!!positionAdvanceDirection &&
        `${isIncreased ? "+" : ""}${positionAdvance}`}
    </div>
  );
};
