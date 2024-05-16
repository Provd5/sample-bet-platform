import { promises as fs } from "fs";

import { type BetInterface, type GameInterface } from "~/types/games";

export const fetchGames = async (): Promise<GameInterface[]> => {
  const filePath = `/data/dummyGamesData.json`;
  const file = await fs.readFile(process.cwd() + filePath, "utf8");
  const data = JSON.parse(file) as GameInterface[];

  return data.reverse();
};

export const fetchBets = async (): Promise<BetInterface[]> => {
  const filePath = `/data/dummyBetsData.json`;
  const file = await fs.readFile(process.cwd() + filePath, "utf8");
  const data = JSON.parse(file) as BetInterface[];

  return data;
};
