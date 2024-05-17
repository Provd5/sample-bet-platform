"use client";

import type { FC } from "react";

import { type ResultInterface } from "~/types/results";

import { cn } from "~/lib/utils";

import { ResultCardItem } from "./result-card-item";

interface ResultCardProps {
  sessionId: string | undefined;
  result: ResultInterface;
  place: number;
}

export const ResultCard: FC<ResultCardProps> = ({
  sessionId,
  result,
  place,
}) => {
  const sessionResult = sessionId === result.user_id;

  const medal =
    (place === 1 && "🥇") ||
    (place === 2 && "🥈") ||
    (place === 3 && "🥉") ||
    null;

  return (
    <div className="flex w-full justify-center px-2 pt-2 pb-3 hover:bg-gray-500/10">
      <div className="flex flex-col gap-2 items-center w-full max-w-xl">
        <h1 className={cn("self-end pr-6", sessionResult && "text-blue-500")}>
          {result.username}
          {medal && <span className="ml-1">{medal}</span>}
        </h1>
        <div className="flex items-center justify-between divide-x divide-x-gray-500/10">
          <ResultCardItem className="font-bold">{`${place}.`}</ResultCardItem>
          <ResultCardItem>{result.accurate_scores}</ResultCardItem>
          <ResultCardItem>{result.points}</ResultCardItem>
        </div>
      </div>
    </div>
  );
};
