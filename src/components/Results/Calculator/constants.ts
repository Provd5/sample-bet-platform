import { type GameInterface } from "~/types/games";

export const WINNER_POINTS = 1;
export const ACCURATE_SCORE_POINTS = 2;
export const ACCURATE_SCORE_AND_WINNER_BONUS_POINTS = 0;
export const ACCURATE_FINALS_TEAM_POINTS = 3;

export const STAGE_MULTIPLIER = (stage: GameInterface["stage"]) => {
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
