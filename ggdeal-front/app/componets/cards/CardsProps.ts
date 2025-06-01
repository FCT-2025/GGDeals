import type { Plataform } from "~/services/PlataformService";
import { TypeGame } from "~/types/Game";


export type CardsProps = {
  src: string;
  alt: string;
  title: string;
  prize: number;
  edition?: string;
  id: number;
  type:TypeGame;
  nameSlug?: string;
  plataforms?: Array<Plataform>;
  discount?: number;
  className?: string;
};
