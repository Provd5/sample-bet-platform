"use server";

import { revalidateTag, unstable_cache as cache } from "next/cache";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import { ERROR_ENUM } from "~/types/errors";
import { type BetFinalsInterface } from "~/types/teams";

import { FINALS_BETTING_CLOSING_DATE } from "~/constants/current-event";

import { readSessionId } from "../auth/session";
import { errorHandler } from "../error-handler";
import { db } from "../firebase";
import {
  betFinalsSchema,
  type betFinalsSchemaType,
} from "../validatorSchemas/bet";
import { getUser } from "./users";

export const getSessionFinalsBet =
  async (): Promise<BetFinalsInterface | null> => {
    try {
      const session = await readSessionId();
      if (!session) return null;

      const fetchFn = cache(
        async (userId: string) => {
          const finalsRef = doc(db, "finals", `${userId}_finals`);
          const finalsBet = await getDoc(finalsRef);

          if (!finalsBet.exists()) return null;

          const finalsBetData = finalsBet.data() as BetFinalsInterface;

          return finalsBetData;
        },
        ["cache-getSessionFinalsBet"],
        {
          tags: ["cache-getSessionFinalsBet"],
        },
      );

      const bets = await fetchFn(session.userId);
      return bets;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

export const getAllUsersFinalsBets = cache(
  async (): Promise<BetFinalsInterface[]> => {
    try {
      const finalsRef = collection(db, "finals");
      const finalsBets = await getDocs(finalsRef);

      if (finalsBets.empty) return [];

      const finalsArray = finalsBets.docs.map((doc) =>
        doc.data(),
      ) as BetFinalsInterface[];

      return finalsArray;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  ["cache-getAllUsersFinalsBets"],
  {
    tags: ["cache-getAllUsersFinalsBets"],
    revalidate: 120, // revalidate every 2 minutes
  },
);

export const betFinals = async (
  values: betFinalsSchemaType,
): Promise<{ success: boolean; errorMsg?: string }> => {
  try {
    const validValues = betFinalsSchema.parse(values);

    if (validValues.teams.length !== 2)
      return {
        success: false,
        errorMsg: "Wybierz dwie drużyny finałowe!",
      };

    if (Date.now() > FINALS_BETTING_CLOSING_DATE)
      return {
        success: false,
        errorMsg: "Zakłady zostały już zamknięte!",
      };

    const session = await readSessionId();
    if (!session) return { success: false, errorMsg: ERROR_ENUM.UNAUTHORIZED };

    const user = await getUser(session.userId);
    if (!user) return { success: false, errorMsg: ERROR_ENUM.UNAUTHORIZED };

    const betsRef = doc(db, "finals", `${session.userId}_finals`);

    await setDoc(betsRef, {
      userId: session.userId,
      username: user.username,
      teamBet: validValues.teams,
    });

    revalidateTag("cache-getSessionFinalsBet");
    return { success: true };
  } catch (e) {
    throw new Error(errorHandler(e));
  }
};
