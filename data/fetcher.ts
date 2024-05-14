import { promises as fs } from "fs";

import { type GameInterface } from "~/types/games";

export const fetchData = async (): Promise<GameInterface[]> => {
  const filePath = `/data/dummyGamesData.json`;
  const file = await fs.readFile(process.cwd() + filePath, "utf8");
  return JSON.parse(file) as GameInterface[];
};
