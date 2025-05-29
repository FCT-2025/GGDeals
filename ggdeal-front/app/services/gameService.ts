import { Config } from "../config/config";

export type Game = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  releaseDate: string;
};

export async function getGames(): Promise<Game[]> {
  const res = await fetch(Config.GGDEAL.GAME);
  const data = await res.json();
  return data as Game[];
}

async function getGameBySlugOrId(id: number | string): Promise<Game> {
  const res = await fetch(`${Config.GGDEAL.GAME}/${id}`);
  const data = await res.json();
  return data as Game;
}

async function getGameByName(name: string): Promise<Game[]> {
  const res = await fetch(`${Config.GGDEAL}/game?name=${name}`);
  const data = await res.json();
  return data as Game[];
}


