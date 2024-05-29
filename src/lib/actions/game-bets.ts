"use server";

import { revalidateTag, unstable_cache as cache } from "next/cache";
import {
  collection,
  doc,
  getDocs,
  query as firestoreQuery,
  setDoc,
  where,
} from "firebase/firestore";

import { ERROR_ENUM } from "~/types/errors";
import { type BetInterface } from "~/types/games";

import { readSessionId } from "../auth/session";
import { errorHandler } from "../error-handler";
import { db } from "../firebase";
import {
  betGameSchema,
  type betGameSchemaType,
  betSchema,
  type betSchemaType,
} from "../validatorSchemas/bet";
import { getUser } from "./users";

export const getSessionBets = async (): Promise<BetInterface[]> => {
  try {
    const session = await readSessionId();
    if (!session) return [];

    const fetchFn = cache(
      async (userId: string) => {
        const betsRef = collection(db, "bets");
        const q = firestoreQuery(betsRef, where("userId", "==", userId));
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

export const getUsersBets = cache(
  async (gameId: string | number): Promise<BetInterface[]> => {
    try {
      const betsRef = collection(db, "bets");
      const q = firestoreQuery(betsRef, where("gameId", "==", gameId));
      const bets = await getDocs(q);

      if (bets.empty) return [];

      const betsArray = bets.docs.map((doc) => doc.data()) as BetInterface[];

      return betsArray;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  ["cache-getUsersBets"],
  {
    tags: ["cache-getUsersBets"],
    revalidate: 120, // revalidate every 2 minutes
  }
);

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
  gameValues: betGameSchemaType
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
      userId: session.userId,
      gameId: validGameValues.gameId,
      awayGoals: validValues.away,
      homeGoals: validValues.home,
      winner: validValues.winner,
      gameStage: validGameValues.stage,
    });

    revalidateTag("cache-getSessionBets");
    return { success: true };
  } catch (e) {
    throw new Error(errorHandler(e));
  }
};
