import { promises as fs } from "fs";

import { type BetInterface, type GameInterface } from "~/types/games";

export const fetchGames = async (): Promise<GameInterface[]> => {
  const filePath = `/data/dummyGamesData.json`;
  const file = await fs.readFile(process.cwd() + filePath, "utf8");
  const data = JSON.parse(file) as GameInterface[];

  const sortedData = data.sort((a, b) => {
    if (a.status !== "TIMED" && b.status !== "IN_PLAY" && b.status !== "PAUSED")
      return -1;
    return 0;
  });

  return sortedData;
};

export const fetchBets = async (): Promise<BetInterface[]> => {
  const filePath = `/data/dummyBetsData.json`;
  const file = await fs.readFile(process.cwd() + filePath, "utf8");
  const data = JSON.parse(file) as BetInterface[];

  return data;
};
