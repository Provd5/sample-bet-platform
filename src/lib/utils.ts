import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

import { type constantsToTranslate } from "~/types/games";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(timestamp: number): string {
  return format(new Date(timestamp), "EEEE HH:mm | dd/MM/yyyy", { locale: pl });
}

export function translateConstantsToPolish(
  constant: constantsToTranslate
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
      return "Wstrzymany";
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
    default:
      return constant;
  }
}
