export interface GameInterface {
  id: string;
  awayTeamIcon: string;
  awayTeamName: string;
  homeTeamIcon: string;
  homeTeamName: string;
  fullTimeScore?: {
    away: number;
    home: number;
    winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW";
  };
  regularTimeScore?: {
    away: number;
    home: number;
    winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW";
  };
  status:
    | "TIMED"
    | "SCHEDULED"
    | "LIVE"
    | "IN_PLAY"
    | "PAUSED"
    | "FINISHED"
    | "POSTPONED"
    | "SUSPENDED"
    | "CANCELLED";
  stage: "GROUP_STAGE" | "LAST_16" | "QUARTER_FINALS" | "SEMI_FINALS" | "FINAL";
  timestamp: number;
}

export type constantsToTranslate =
  | GameInterface["status"]
  | GameInterface["stage"]
  | "HOME_TEAM"
  | "AWAY_TEAM"
  | "DRAW";
