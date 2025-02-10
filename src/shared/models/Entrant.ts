type EntrantType = 'player' | 'team'

export type Entrant = {
  name: string
  color: string
  type: EntrantType
  available?: boolean
  components?: Entrant[]
}

export type ClassificationEntrant = Entrant & {
  results?: any[]
  position: number
}
