import { type BetInterface, type GameInterface } from "~/types/games";
import { type ResultInterface } from "~/types/results";
import { type BetFinalsInterface } from "~/types/teams";

import { calculateLeaderboardPositions } from "./calculate-leaderboard-positions";
import { calculatePoints } from "./calculate-points";

export default function resultsCalculator(
  games: GameInterface[],
  bets: BetInterface[],
  finalsBets: BetFinalsInterface[],
) {
  const gameMap = new Map(games.map((game) => [game.id, game]));
  const finalsBetMap = new Map(
    finalsBets.map((finalsBet) => [finalsBet.userId, finalsBet.teamBet]),
  );
  const userResultsMap = new Map<string, ResultInterface>();

  bets.forEach((bet) => {
    const game = gameMap.get(bet.gameId);
    if (!game) {
      return;
    }

    const finalsBet = finalsBetMap.get(bet.userId);
    const currentPoints = userResultsMap.get(bet.userId)?.points;
    const points = calculatePoints(currentPoints, bet, finalsBet, game);

    if (userResultsMap.has(bet.userId)) {
      const existingUser = userResultsMap.get(bet.userId);
      existingUser!.points = points;
    } else {
      userResultsMap.set(bet.userId, {
        userId: bet.userId,
        username: bet.username,
        points,
        currentPosition: 0, // Will calculate this later
        livePositionAdvance: 0, // Will calculate this later
      });
    }
  });

  const leaderboard: ResultInterface[] = Array.from(userResultsMap.values());

  // Calculate current positions for finished matches
  calculateLeaderboardPositions(leaderboard, compareResults);
  const initialPositions = new Map<string, number>();
  leaderboard.forEach((result) => {
    initialPositions.set(result.userId, result.currentPosition);
  });

  // Calculate current positions for live+finished matches
  calculateLeaderboardPositions(leaderboard, compareLiveResults);
  // Calculate live positions advance
  leaderboard.forEach((result) => {
    const initialPosition = initialPositions.get(result.userId);
    if (initialPosition !== undefined) {
      result.livePositionAdvance = initialPosition - result.currentPosition;
    }
  });

  return leaderboard;
}

function compareLiveResults(a: ResultInterface, b: ResultInterface): number {
  if (b.points.currentLivePoints !== a.points.currentLivePoints) {
    return b.points.currentLivePoints - a.points.currentLivePoints;
  } else {
    return (
      b.points.currentLiveAccurateScores - a.points.currentLiveAccurateScores
    );
  }
}

function compareResults(a: ResultInterface, b: ResultInterface): number {
  if (b.points.currentPoints !== a.points.currentPoints) {
    return b.points.currentPoints - a.points.currentPoints;
  } else {
    return b.points.currentAccurateScores - a.points.currentAccurateScores;
  }
}
