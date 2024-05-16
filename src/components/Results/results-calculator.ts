import { type BetInterface, type GameInterface } from "~/types/games";
import { type ResultInterface } from "~/types/results";

const GOALS_POINTS = 0.5;
const WINNER_POINTS = 1;
const ACCURATE_SCORE_POINTS = 2;
const ACCURATE_SCORE_AND_WINNER_POINTS = 3;

const STAGE_MULTIPLIER = (stage: GameInterface["stage"]) => {
  let MULTIPLIER: number;

  switch (stage) {
    case "FINAL":
      MULTIPLIER = 3;
      break;
    case "SEMI_FINALS":
      MULTIPLIER = 2.5;
      break;
    case "QUARTER_FINALS":
      MULTIPLIER = 2;
      break;
    case "LAST_16":
      MULTIPLIER = 1.5;
      break;
    default:
      MULTIPLIER = 1;
      break;
  }

  return MULTIPLIER;
};

export default function resultsCalculator(
  games: GameInterface[],
  bets: BetInterface[]
) {
  const results = bets.reduce<ResultInterface[]>((acc, bet) => {
    const game = games.find((game) => game.id === bet.game_id);
    if (!game) {
      return [];
    }

    const multiplier = STAGE_MULTIPLIER(game.stage);
    let points = 0;
    let accurate_scores = 0;

    const away_goals_hit = bet.away_goals === game.regularTimeScore?.away;
    const home_goals_hit = bet.home_goals === game.regularTimeScore?.home;
    const accurate_score_hit = away_goals_hit && home_goals_hit;
    const winner_hit = bet.winner === game.regularTimeScore?.winner;
    const accurate_score_and_winner_hit =
      away_goals_hit && home_goals_hit && winner_hit;

    if (game.status === "FINISHED") {
      if (away_goals_hit) {
        points += GOALS_POINTS;
      }
      if (home_goals_hit) {
        points += GOALS_POINTS;
      }
      if (winner_hit) {
        points += WINNER_POINTS;
      }
      if (accurate_score_hit) {
        points += ACCURATE_SCORE_POINTS;
        accurate_scores += 1;
      }
      if (accurate_score_and_winner_hit) {
        points += ACCURATE_SCORE_AND_WINNER_POINTS;
      }
    }

    points * multiplier;

    const existingUser = acc.find((user) => user.user_id === bet.user_id);
    if (existingUser) {
      existingUser.points += points;
    } else {
      acc.push({
        user_id: bet.user_id,
        username: bet.username,
        points,
        accurate_scores,
      });
    }

    return acc;
  }, []);

  const sortedResults = results.sort((a, b) => b.points - a.points);
  return sortedResults;
}
