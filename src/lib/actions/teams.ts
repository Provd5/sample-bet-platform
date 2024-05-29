"use server";

import { unstable_cache as cache } from "next/cache";
import { child, get, query, ref } from "firebase/database";

import { type TeamInterface } from "~/types/teams";

import { realtimeDb } from "../firebase";

export const getAllTeams = cache(
  async (): Promise<TeamInterface[]> => {
    const requiredFields: Partial<keyof TeamInterface>[] = [
      "id",
      "icon",
      "name",
      "nameCode",
    ] as const;

    try {
      const dbRef = ref(realtimeDb);
      const queryRef = query(child(dbRef, `teams/`));
      const teams = await get(queryRef);

      if (!teams.exists()) return [];
      const snapshotValue: unknown = teams.val();

      const isArray = snapshotValue instanceof Array;
      const isObject = snapshotValue instanceof Object;

      const teamsData = (
        isArray
          ? snapshotValue.filter((team) => team !== null)
          : isObject
          ? Object.entries(snapshotValue)
              .map(([_, value]) => value as TeamInterface)
              .filter((game) => game !== null)
          : []
      ) as TeamInterface[];

      requiredFields.forEach((field) => {
        if (!teamsData.every((x) => x[field]))
          throw new Error(`No ${field} field`);
      });

      return teamsData;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  ["cache-getAllTeams"],
  {
    tags: ["cache-getAllTeams"],
  }
);
