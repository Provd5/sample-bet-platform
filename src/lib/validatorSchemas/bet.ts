import { z } from "zod";

import { MatchStageArray, MatchWinnerArray } from "~/types/games";

export type betSchemaType = z.infer<typeof betSchema>;
export const betSchema = z.object({
  home: z.number().min(0),
  away: z.number().min(0),
  winner: z.enum([...MatchWinnerArray, ""]),
});

export const betGameSchema = z.object({
  gameId: z.union([z.string(), z.number()]),
  timestamp: z.number(),
  stage: z.enum(MatchStageArray),
});
