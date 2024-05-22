import { type BetInterface, type GameInterface } from "~/types/games";
import { type ResultInterface } from "~/types/results";

interface PointsInterface {
  currentPoints: number;
  currentLivePoints: number,
  currentAccurateScores: number,
  currentLiveAccurateScores: number
}

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
  const userResultsMap = new Map<string, ResultInterface>();

  bets.forEach((bet) => {
    const game = gameMap.get(bet.game_id);
    if (!game) {
      return;
    }

    let currentPoints = userResultsMap.get(bet.user_id)?.points;
    let points = calculatePoints(currentPoints, bet, game);

    if (userResultsMap.has(bet.user_id)) {
      let existingUser = userResultsMap.get(bet.user_id);
      existingUser!.points = points;
    } else {
      userResultsMap.set(bet.user_id, {
        user_id: bet.user_id,
        username: bet.username,
        points,
        currentPosition: 0, // Will calculate this later
        livePositionAdvance: 0 // Will calculate this later
      });
    }
  });



  let leaderboard: ResultInterface[] = Array.from(userResultsMap.values())

  // Calculate current positions for finished matches
  calculateLeaderboardPositions(leaderboard, compareResults);
  let initialPositions = new Map<string, number>();
  leaderboard.forEach((result) => {
    initialPositions.set(result.user_id, result.currentPosition);
  });

  // Calculate current positions for live+finished matches
  calculateLeaderboardPositions(leaderboard, compareLiveResults);
  // Calculate live positions advance
  leaderboard.forEach((result) => {
    let initialPosition = initialPositions.get(result.user_id);
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
    return b.points.currentLiveAccurateScores - a.points.currentLiveAccurateScores;
  }
}

function compareResults(a: ResultInterface, b: ResultInterface): number {
  if (b.points.currentPoints !== a.points.currentPoints) {
    return b.points.currentPoints - a.points.currentPoints;
  } else {
    return b.points.currentAccurateScores - a.points.currentAccurateScores;
  }
}

function calculateLeaderboardPositions(results: ResultInterface[], comparator: (a: ResultInterface, b: ResultInterface) => number) {
  results.sort(comparator);

  let currentPosition = 1;
  results.forEach((result, index) => {

    if (index > 0 && comparator(results[index - 1], result) === 0) {
      result.currentPosition = results[index - 1].currentPosition;
    } else {
      result.currentPosition = currentPosition;
      currentPosition = index + 2;
    }
  });
}

function calculatePoints(currentPoints: PointsInterface | undefined, bet: BetInterface, game: GameInterface): PointsInterface {

  let points = currentPoints?.currentPoints || 0;
  let livePoints = currentPoints?.currentLivePoints || 0;
  let liveAccurateScores = 0;
  let accurateScores = 0;

  const away_goals_hit = bet.away_goals === game.regularTimeScore?.away;
  const home_goals_hit = bet.home_goals === game.regularTimeScore?.home;
  const accurate_score_hit = away_goals_hit && home_goals_hit;
  const winner_hit = bet.winner === game.regularTimeScore?.winner;
  const accurate_score_and_winner_hit =
    away_goals_hit && home_goals_hit && winner_hit;

  const isGameFinished = game.status == "FINISHED";
  const isGameInPlayOrFinished = game.status == "FINISHED" || game.status == "IN_PLAY" || game.status == "PAUSED";

  if (winner_hit) {
    points += isGameFinished ? WINNER_POINTS : 0;
    livePoints += isGameInPlayOrFinished ? WINNER_POINTS : 0;
  }
  if (accurate_score_hit) {
    points += isGameFinished ? ACCURATE_SCORE_POINTS : 0;
    livePoints += isGameInPlayOrFinished ? ACCURATE_SCORE_POINTS : 0;

    accurateScores += isGameFinished ? 1 : 0;
    liveAccurateScores += isGameInPlayOrFinished ? 1 : 0;
  }
  if (accurate_score_and_winner_hit) {
    points += ACCURATE_SCORE_AND_WINNER_BONUS_POINTS;
  }


  const multiplier = STAGE_MULTIPLIER(game.stage);
  points *= multiplier;

  return {
    currentPoints: points,
    currentLivePoints: livePoints,
    currentAccurateScores: accurateScores,
    currentLiveAccurateScores: liveAccurateScores
  }
}