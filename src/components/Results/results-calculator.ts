import { type BetInterface, type GameInterface } from "~/types/games";
import { type ResultInterface } from "~/types/results";

const WINNER_POINTS = 1;
const ACCURATE_SCORE_POINTS = 2;
const ACCURATE_SCORE_AND_WINNER_BONUS_POINTS = 0;

const STAGE_MULTIPLIER = (stage: GameInterface["stage"]) => {
  let MULTIPLIER: number;

  switch (stage) {
    case "FINAL":
      MULTIPLIER = 1;
      break;
    case "SEMI_FINALS":
      MULTIPLIER = 1;
      break;
    case "QUARTER_FINALS":
      MULTIPLIER = 1;
      break;
    case "LAST_16":
      MULTIPLIER = 1;
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
  const gameMap = new Map(games.map((game) => [game.id, game]));

  const results = bets.reduce<ResultInterface[]>((acc, bet) => {
    const game = gameMap.get(bet.game_id);
    if (!game) {
      return acc;
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
      if (winner_hit) {
        points += WINNER_POINTS;
      }
      if (accurate_score_hit) {
        points += ACCURATE_SCORE_POINTS;
        accurate_scores += 1;
      }
      if (accurate_score_and_winner_hit) {
        points += ACCURATE_SCORE_AND_WINNER_BONUS_POINTS;
      }
    }

    points *= multiplier;

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
