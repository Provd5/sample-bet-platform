import { type GameInterface } from "~/types/games";
import { type PointsInterface } from "~/types/results";
import { type BetFinalsInterface } from "~/types/teams";

import { ACCURATE_FINALS_TEAM_POINTS } from "../constants";

export function calculateFinalsPoints(
  currentPoints: PointsInterface | undefined,
  teamBet: BetFinalsInterface["teamBet"] | undefined,
  finalGame: GameInterface,
): number {
  if (!teamBet || !teamBet.length) return 0;

  let points = currentPoints?.currentPoints || 0;

  const finals_team_hit = teamBet.some(
    (bet) =>
      bet.teamName === finalGame.awayTeamName ||
      bet.teamName === finalGame.homeTeamName,
  );
  const double_finals_team_hit = teamBet.every(
    (bet) =>
      bet.teamName === finalGame.awayTeamName ||
      bet.teamName === finalGame.homeTeamName,
  );
  if (finals_team_hit) {
    points += ACCURATE_FINALS_TEAM_POINTS;
  }
  if (double_finals_team_hit) {
    points += ACCURATE_FINALS_TEAM_POINTS;
  }

  return points;
}
