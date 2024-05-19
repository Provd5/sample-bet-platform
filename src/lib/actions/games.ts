"use server";

import { revalidateTag, unstable_cache as cache } from "next/cache";
import {
  child,
  get,
  limitToLast,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import {
  collection,
  doc,
  getDocs,
  query as firestoreQuery,
  setDoc,
  where,
} from "firebase/firestore";

import { ERROR_ENUM } from "~/types/errors";
import { type BetInterface, type GameInterface } from "~/types/games";

import { readSessionId } from "../auth/session";
import { errorHandler } from "../error-handler";
import { db, realtimeDb } from "../firebase";
import {
  betGameSchema,
  betSchema,
  type betSchemaType,
} from "../validatorSchemas/bet";
import { getUser } from "./users";

export const getAllGames = cache(
  async (): Promise<GameInterface[]> => {
    const gameRequiredFields: Partial<keyof GameInterface>[] = [
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
        limitToLast(100)
      );
      const games = await get(queryRef);

      if (!games.exists()) return [];
      const snapshotValue: unknown = games.val();

      const isArray = snapshotValue instanceof Array;
      const isObject = snapshotValue instanceof Object;

      const gamesData = (
        isArray
          ? snapshotValue.filter((game) => game !== null).reverse()
          : isObject
          ? Object.entries(snapshotValue)
              .map(([_, value]) => value as GameInterface)
              .filter((game) => game !== null)
              .reverse()
          : []
      ) as GameInterface[];

      gameRequiredFields.forEach((field) => {
        if (!gamesData.every((x) => x[field]))
          throw new Error(`No ${field} field`);
      });

      return gamesData;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  ["cache-getAllGames"],
  {
    tags: ["cache-getAllGames"],
    revalidate: 60, // revalidate every 1 minute
  }
);

export const getSessionBets = async (): Promise<BetInterface[]> => {
  try {
    const session = await readSessionId();
    if (!session) return [];

    const fetchFn = cache(
      async (userId: string) => {
        const betsRef = collection(db, "bets");
        const q = firestoreQuery(betsRef, where("user_id", "==", userId));
        const bets = await getDocs(q);

        if (bets.empty) return [];

        const betsArray = bets.docs.map((doc) => doc.data()) as BetInterface[];

        return betsArray;
      },
      ["cache-getSessionBets"],
      {
        tags: ["cache-getSessionBets"],
      }
    );

    const bets = await fetchFn(session.userId);
    return bets;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getAllUsersBets = cache(
  async (): Promise<BetInterface[]> => {
    try {
      const betsRef = collection(db, "bets");
      const bets = await getDocs(betsRef);

      if (bets.empty) return [];

      const betsArray = bets.docs.map((doc) => doc.data()) as BetInterface[];

      return betsArray;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  ["cache-getAllUsersBets"],
  {
    tags: ["cache-getAllUsersBets"],
    revalidate: 120, // revalidate every 2 minutes
  }
);

export const betGame = async (
  values: betSchemaType,
  gameValues: {
    gameId: GameInterface["id"];
    timestamp: GameInterface["timestamp"];
    stage: GameInterface["stage"];
  }
): Promise<{ success: boolean; errorMsg?: string }> => {
  try {
    const validValues = betSchema.parse(values);
    const validGameValues = betGameSchema.parse(gameValues);

    if (values.winner === "")
      return {
        success: false,
        errorMsg: "Wybierz najpierw kto wygra!",
      };

    if (Date.now() > gameValues.timestamp)
      return {
        success: false,
        errorMsg: "Zakłady na ten mecz zostały już zamknięte!",
      };

    const session = await readSessionId();
    if (!session) return { success: false, errorMsg: ERROR_ENUM.UNAUTHORIZED };

    const user = await getUser(session.userId);
    if (!user) return { success: false, errorMsg: ERROR_ENUM.UNAUTHORIZED };

    const betsRef = doc(
      db,
      "bets",
      `${session.userId}_${validGameValues.gameId}`
    );

    await setDoc(betsRef, {
      username: user.username,
      user_id: session.userId,
      game_id: validGameValues.gameId,
      away_goals: validValues.away,
      home_goals: validValues.home,
      winner: validValues.winner,
      game_stage: validGameValues.stage,
    });

    revalidateTag("cache-getSessionBets");
    return { success: true };
  } catch (e) {
    throw new Error(errorHandler(e));
  }
};
