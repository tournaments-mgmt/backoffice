import type { ClassificationEntrant } from "@/shared/models/Entrant.ts";

export type Group = {
  name: string;
  entrants: ClassificationEntrant;
  color: string;
};
