import  Config  from "../config/config";

type Game = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  releaseDate: string;
};

async function getGames(): Promise<Game[]> {
  const res = await fetch(`${Config.API_URL}/game`);
  const data = await res.json();
  return data;
}

async function getGameBySlugOrId(id: number | string): Promise<Game> {
  const res = await fetch(`${Config.API_URL}/game/${id}`);
  const data = await res.json();
  return data;
}

async function getGameByName(name: string): Promise<Game[]> {
  const res = await fetch(`${Config.API_URL}/game?name=${name}`);
  const data = await res.json();
  return data;
}


