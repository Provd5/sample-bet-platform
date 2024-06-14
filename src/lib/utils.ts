import { type ClassValue, clsx } from "clsx";
import { pl } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";
import { twMerge } from "tailwind-merge";

import {
  type constantsToTranslate,
  type GameInterface,
  type MatchWinner,
} from "~/types/games";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(timestamp: number): string {
  return formatInTimeZone(
    new Date(timestamp),
    "Europe/Warsaw",
    "EEEE HH:mm | dd/MM/yyyy",
    { locale: pl },
  );
}

export function getMatchWinnerName(
  matchWinner: MatchWinner,
  game: GameInterface,
): string {
  switch (matchWinner) {
    case "AWAY_TEAM":
      return game.awayTeamName;
    case "HOME_TEAM":
      return game.homeTeamName;
    default:
      return translateConstantsToPolish(matchWinner);
  }
}

export function translateConstantsToPolish(
  constant: constantsToTranslate,
): string {
  switch (constant) {
    case "HOME_TEAM":
      return "Gospodarze";
    case "AWAY_TEAM":
      return "Goście";
    case "DRAW":
      return "Remis";
    case "TIMED":
      return "Nadchodzący";
    case "SCHEDULED":
      return "Zaplanowany";
    case "LIVE":
      return "Na żywo";
    case "IN_PLAY":
      return "W trakcie";
    case "PAUSED":
      return "Przerwa";
    case "FINISHED":
      return "Zakończony";
    case "POSTPONED":
      return "Przełożony";
    case "SUSPENDED":
      return "Zawieszony";
    case "CANCELLED":
      return "Anulowany";
    case "GROUP_STAGE":
      return "Faza grupowa";
    case "LAST_16":
      return "1/8 finału";
    case "QUARTER_FINALS":
      return "Ćwierćfinał";
    case "SEMI_FINALS":
      return "Półfinał";
    case "FINAL":
      return "Finał";
    case "REGULAR_SEASON":
      return "Liga";
    default:
      return constant;
  }
}
