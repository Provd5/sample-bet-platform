"use server";

import {
  child,
  get,
  limitToLast,
  orderByChild,
  query,
  ref,
} from "firebase/database";

import { type GameInterface } from "~/types/games";

import { errorHandler } from "../error-handler";
import { realdb } from "../firebase";

export const getAllGames = async (): Promise<GameInterface[] | null> => {
  try {
    const dbRef = ref(realdb);
    const queryRef = query(
      child(dbRef, `matches/`),
      orderByChild("timestamp"),
      limitToLast(100)
    );
    const games = await get(queryRef);

    if (!games.exists()) return null;
    const gamesData = (games.val() as GameInterface[]).reverse();

    return gamesData;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
};
