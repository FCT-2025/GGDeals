import type { Plataform } from "~/services/PlataformService";

export enum TypeGame {
  AVAIBLE = "AVAIBLE",
  PREORDER = "PREORDER",
}

export type Game = {
  id: number;
  title: string;
  description?: string;       
  type: TypeGame;
  image?: string | null;      
  prize: number;
  genre: Genre;
  development:string;
  discount: number | null;
  releaseDate?: string;       
  nameSlug: string;
  src: string | null;
  platformModels: Plataform[];
  replicas: Replica[];
  gameMedias: GameMedia[];      
  features: Feature[];        
  editions: Edition[];        
};

export type GameMedia = {
  id: number;
  path: string;
  isThumbnail: boolean | null;
};

export type Edition = {
  id:number;
  name:string;
  price:number;
  description:string;
}

export type Feature = {
  id: number;
  name: string;
};

export type Genre = {
  id: number;
  name: string;
};


type Replica = {
  id: number;
  activationKey: string;
  isSold: boolean;
  edition: null | {
    id?: number;
    name?: string;
  };
  sale: null | {
    id?: number;
    date?: string;
    price?: number;
  };
};