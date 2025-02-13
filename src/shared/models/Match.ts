import type { Entrant } from '@/shared/models/Entrant.ts'
import type { MatchStatus } from '@/shared/constants/MatchStatus.ts'

export type TeamsCount = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128

export type Match = {
  id: string
  scoreBoolean: boolean
  scheduledStartTime: number
  scheduledEndTime: number
  realStartTime: number
  realEndTime: number
  status: MatchStatus
  scoresCount?: number
  scoresLabels?: string[]
  showScoresLabels: boolean
  attempts?: number
  bestScores?: []
  editMode: boolean
}

export type SinglePlayerMatch = Match & {
  entrant: Entrant
  scores: number[][]
}

export type MultiplayerMatch = Match & {
  entrants: Entrant[]
  scores: number[][][]
  entrantsCount: number
  bestOf: number
  winner: number
}

export type BracketMatch = MultiplayerMatch & {
  num: number
  step: number
  phase: number
}
