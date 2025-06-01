import type { Plataform } from "~/services/PlataformService";

export enum TypeGame {
  AVAIBLE = "AVAIBLE",
  PREORDER = "PREORDER",
}

export type Game = {
  id: number;
  title:string
  description: string;
  type: TypeGame;
  image: string;
  prize: number;
  releaseDate: string;
  nameSlug: string;
  src: string;
  discount: number;
  platformModels: Array<Plataform>;
};
