import type { FC } from "react";

import { type ResultInterface } from "~/types/results";

import { cn } from "~/lib/utils";

import { ResultPositionAdvance } from "./result-position-advance";

interface ResultCardProps {
  sessionId: string | undefined;
  result: ResultInterface;
}

export const ResultCard: FC<ResultCardProps> = ({ sessionId, result }) => {
  const medal =
    (result.currentPosition === 1 && "🥇") ||
    (result.currentPosition === 2 && "🥈") ||
    (result.currentPosition === 3 && "🥉") ||
    null;

  const sessionResult = sessionId === result.userId;

  const accurateScoreAdvance =
    result.points.currentLiveAccurateScores -
    result.points.currentAccurateScores;

  const pointsAdvance =
    result.points.currentLivePoints - result.points.currentPoints;

  return (
    <div className="hover:bg-gray-500/10 px-2 pt-3 pb-4">
      <div className="flex items-center justify-between divide-x divide-x-gray-500/10 max-w-3xl mx-auto">
        <div className="flex divide-x divide-x-gray-500/10 items-center">
          <p className="flex items-center justify-center px-1 w-10 text-center shrink-0 font-bold relative">
            {`${result.currentPosition}.`}
            {medal && <span className="absolute -top-3 -left-2">{medal}</span>}
          </p>
          <div className="px-1 flex items-center gap-1 self-start w-full">
            <h1
              className={cn(
                "truncate lg:max-w-lg md:max-w-md sm:max-w-sm max-w-[45cqw] xl:max-w-xl",
                sessionResult && "text-blue-500"
              )}
            >
              {result.username}
            </h1>
            <ResultPositionAdvance
              positionAdvance={result.livePositionAdvance}
            />
          </div>
        </div>
        <div className="flex divide-x divide-x-gray-500/10 items-center">
          <p
            className={cn(
              "flex items-center justify-center px-1 w-10 text-center shrink-0",
              accurateScoreAdvance > 0 && "text-green-600",
              accurateScoreAdvance < 0 && "text-destructive"
            )}
          >
            {result.points.currentLiveAccurateScores}
          </p>
          <p
            className={cn(
              "flex items-center justify-center px-1 w-10 text-center shrink-0",
              pointsAdvance > 0 && "text-green-600",
              pointsAdvance < 0 && "text-destructive"
            )}
          >
            {result.points.currentLivePoints}
          </p>
        </div>
      </div>
    </div>
  );
};
