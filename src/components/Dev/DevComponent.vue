<script lang="ts">
import { defineComponent } from 'vue'
import type { BracketMatch } from '@/shared/models/Match.ts'
import moment from 'moment'
import { MatchStatus } from '@/shared/constants/MatchStatus.ts'
import BestOfMatch from '@/components/BestOfMatch/BestOfMatch.vue'

const bracketMatchProps: BracketMatch = {
  attempts: 1,
  bestOf: 1,
  bestScores: [],
  entrantCount: 2,
  entrants: [
    { name: 'Entrant A', available: true, color: '#42f5aa', type: 'player' },
    { name: 'Entrant B', available: true, color: '#f59642', type: 'player' },
  ],
  id: '0',
  num: 0,
  phase: 0,
  realEndTime: moment().add(30, 'minutes').valueOf(),
  realStartTime: moment().add(40, 'minutes').valueOf(),
  scheduledEndTime: moment().add(20, 'minutes').valueOf(),
  scheduledStartTime: moment().add(10, 'minutes').valueOf(),
  scoreBoolean: false,
  scores: [],
  scoresCount: 0,
  scoresLabels: [],
  showScoresLabels: false,
  status: MatchStatus.SCHEDULED,
  step: 0,
  winner: 0,
}
const DevComponent = defineComponent({
  props: {},
  components: {
    BestOfMatch,
  },
  setup() {
    return { bracketMatch: bracketMatchProps as BracketMatch }
  },
})

export default DevComponent
</script>

<template>
  <div class="m-8 grid grid-cols-3 gap-4">
    <div class="flex flex-col">
      <p class="underline">BestOfMatch</p>
      <div class="flex flex-col">
        <div class="flex flex-row">

        </div>
      </div>
      <BestOfMatch
        :entrants="bracketMatch.entrants"
        :entrant-count="bracketMatch.entrantCount"
        :scores="bracketMatch.scores"
        :scores-labels="bracketMatch.scoresLabels"
        :show-scores-labels="bracketMatch.showScoresLabels"
        :scores-count="bracketMatch.scoresCount"
        :status="bracketMatch.status"
        :scheduled-start-time="bracketMatch.scheduledStartTime"
        :scheduled-end-time="bracketMatch.scheduledEndTime"
        :show-scheduled-time="false"
        :real-start-time="bracketMatch.realStartTime"
        :real-end-time="bracketMatch.realEndTime"
        :best-of="bracketMatch.bestOf"
        :winner="bracketMatch.winner"
        :best-scores="bracketMatch.bestScores"
        :score-boolean="bracketMatch.scoreBoolean"
        class="match-item mt-2"
        :align="'left'"
      ></BestOfMatch>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
