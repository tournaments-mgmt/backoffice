import type { Entrant } from "@/shared/models/Entrant.ts";
import type { MatchStatus } from "@/shared/constants/MatchStatus.ts";

export type TeamsCount = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128;

export type SinglePlayerMatch = {
  id: string;
  entrants: Entrant[];
  scores: any[][];
  scoresCount?: number;
  scoresLabels?: string[];
  showScoresLabels: boolean;
  scoreBoolean: boolean;
  scheduledStartTime: number;
  scheduledEndTime: number;
  realStartTime: number;
  realEndTime: number;
  status: MatchStatus;
  attempts?: number;
  bestScores?: [];
};

export type MultiplayerMatch = SinglePlayerMatch & {
  entrantCount: number;
  bestOf: number;
  winner: number;
};

export type BracketMatch = MultiplayerMatch & {
  num: number;
  step: number;
  phase: number;
};
