"use server";

import { unstable_cache as cache } from "next/cache";
import { child, get, orderByChild, query, ref } from "firebase/database";

import { type GameInterface } from "~/types/games";

import { realtimeDb } from "../firebase";

export const getAllGames = cache(
  async (): Promise<GameInterface[]> => {
    const requiredFields: Partial<keyof GameInterface>[] = [
      "id",
      "awayTeamIcon",
      "awayTeamName",
      "homeTeamIcon",
      "homeTeamName",
      "status",
      "stage",
      "timestamp",
    ] as const;

    try {
      const dbRef = ref(realtimeDb);
      const queryRef = query(
        child(dbRef, `matches/`),
        orderByChild("timestamp"),
      );
      const games = await get(queryRef);

      if (!games.exists()) return [];
      const snapshotValue: unknown = games.val();

      const isArray = snapshotValue instanceof Array;
      const isObject = snapshotValue instanceof Object;

      const gamesData = (
        isArray
          ? snapshotValue.filter((game) => game !== null)
          : isObject
            ? Object.entries(snapshotValue)
                .map(([_, value]) => value as GameInterface)
                .filter((game) => game !== null)
            : []
      ) as GameInterface[];

      requiredFields.forEach((field) => {
        if (!gamesData.every((x) => x[field]))
          throw new Error(`No ${field} field`);
      });

      // IN_PLAY and PAUSED games always on top
      const sortedGames = gamesData.sort((a, b) => {
        if (
          (a.status === "IN_PLAY" || a.status === "PAUSED") &&
          b.status !== "IN_PLAY" &&
          b.status !== "PAUSED"
        )
          return -1;
        if (
          a.status !== "IN_PLAY" &&
          a.status !== "PAUSED" &&
          (b.status === "IN_PLAY" || b.status === "PAUSED")
        )
          return 1;
        return 0;
      });

      return sortedGames;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  ["cache-getAllGames"],
  {
    tags: ["cache-getAllGames"],
    revalidate: 120, // revalidate every 2 minutes
  },
);
