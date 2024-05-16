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
import { db, realdb } from "../firebase";
import {
  betGameSchema,
  betSchema,
  type betSchemaType,
} from "../validatorSchemas/bet";
import { getUser } from "./users";

export const getAllGames = cache(
  async (): Promise<GameInterface[]> => {
    try {
      const dbRef = ref(realdb);
      const queryRef = query(
        child(dbRef, `matches/`),
        orderByChild("timestamp"),
        limitToLast(100)
      );
      const games = await get(queryRef);

      if (!games.exists()) return [];
      const gamesData = (games.val() as GameInterface[])
        .filter((game) => game !== null)
        .reverse();

      return gamesData;
    } catch (e) {
      throw new Error(errorHandler(e));
    }
  },
  ["cache-getAllGames"],
  {
    tags: ["cache-getAllGames"],
    revalidate: 120, // revalidate every 2 minutes
  }
);

export const getUserBets = async (): Promise<BetInterface[]> => {
  try {
    const session = await readSessionId();
    if (!session) return [];

    const fetchFn = cache(
      async (userId: string) => {
        const betsRef = collection(db, "bets");
        const q = firestoreQuery(betsRef, where("user_id", "==", userId));
        const bets = await getDocs(q);

        if (bets.empty) return [];

        const betsArray = bets.docs.map((doc) => doc.data());
        return betsArray as BetInterface[];
      },
      ["cache-getUserBets"],
      {
        tags: ["cache-getUserBets"],
      }
    );

    const bets = await fetchFn(session.userId);
    return bets;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
};

export const getAllUsersBets = cache(
  async (): Promise<BetInterface[]> => {
    try {
      const betsRef = collection(db, "bets");
      const bets = await getDocs(betsRef);

      if (bets.empty) return [];

      const betsArray = bets.docs.map((doc) => doc.data());
      return betsArray as BetInterface[];
    } catch (e) {
      throw new Error(errorHandler(e));
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

    if (Date.now() > gameValues.timestamp)
      return { success: false, errorMsg: "Mecz został już zakończony!" };

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

    revalidateTag("cache-getUserBets");
    return { success: true };
  } catch (e) {
    throw new Error(errorHandler(e));
  }
};
