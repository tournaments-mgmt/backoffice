<script lang="ts">
import { defineComponent, type Ref, ref, type UnwrapRef } from 'vue'
import type { BracketMatch, SinglePlayerMatch } from '@/shared/models/Match.ts'
import moment from 'moment'
import { MatchStatus } from '@/shared/constants/MatchStatus.ts'
import BestOfMatch from '@/components/BestOfMatch/BestOfMatch.vue'
import ToggleSwitch from 'primevue/toggleswitch'
import Select from 'primevue/select'
import SingleEntrantMatch from '@/components/SingleEntrantMatch/SingleEntrantMatch.vue'

const bracketMatchProps: Ref<
  UnwrapRef<BracketMatch>,
  UnwrapRef<BracketMatch> | BracketMatch
> = ref<BracketMatch>({
  bestOf: 1,
  bestScores: [],
  entrantsCount: 2,
  entrants: [
    { name: 'Entrant A', available: true, color: '#42f5aa', type: 'player' },
    { name: 'Player B', available: true, color: '#f59642', type: 'player' },
  ],
  id: '0',
  num: 0,
  phase: 0,
  realEndTime: moment().add(30, 'minutes').valueOf(),
  realStartTime: moment().add(40, 'minutes').valueOf(),
  scheduledEndTime: moment().add(20, 'minutes').valueOf(),
  scheduledStartTime: moment().add(10, 'minutes').valueOf(),
  scoreBoolean: false,
  scores: [[[1]], [[23]]],
  // scores: [],
  scoresCount: 1,
  editMode: false,
  scoresLabels: ['Goal', 'Ass'],
  showScoresLabels: false,
  status: MatchStatus.COMPLETED,
  step: 0,
  winner: -1,
})

const bracketMatchShowScheduledTime = ref(false)
const bracketMatchAlignment = ref('left')

const singleEntrantMatchShowScheduledTime = ref(false)
const singleEntrantMatchProps: Ref<
  UnwrapRef<SinglePlayerMatch>,
  UnwrapRef<SinglePlayerMatch> | SinglePlayerMatch
> = ref<SinglePlayerMatch>({
  entrant: { name: 'Entrant A', available: true, color: '#42f5aa', type: 'player' },
  id: '0',
  realEndTime: moment().add(30, 'minutes').valueOf(),
  realStartTime: moment().add(40, 'minutes').valueOf(),
  scheduledEndTime: moment().add(20, 'minutes').valueOf(),
  scheduledStartTime: moment().add(10, 'minutes').valueOf(),
  scoreBoolean: false,
  scores: [],
  scoresCount: 2,
  scoresLabels: ['a', 'b'],
  showScoresLabels: false,
  status: MatchStatus.SCHEDULED,
  editMode: false,
})

const DevComponent = defineComponent({
  props: {},
  components: {
    SingleEntrantMatch,
    ToggleSwitch,
    Select,
    BestOfMatch,
  },
  setup() {
    return {
      bracketMatch: bracketMatchProps,
      MatchStatus: MatchStatus,
      bracketMatchShowScheduledTime: bracketMatchShowScheduledTime,
      bracketMatchAlignment: bracketMatchAlignment,
      singleEntrantMatch: singleEntrantMatchProps,
      singleEntrantMatchShowScheduledTime: singleEntrantMatchShowScheduledTime,
    }
  },
  methods: {
    enterEditMode() {
      bracketMatchProps.value.editMode = true
    },
    confirmEditMode(data: number[][][]) {
      console.log('Confirm Edit Mode')
      bracketMatchProps.value.scores = data
    },
  },
})

export default DevComponent
</script>

<template>
  <div class="grid grid-cols-3 gap-4 w-full">
    <div class="flex flex-col">
      <h1 class="underline font-bold">BestOfMatch</h1>
      <div class="flex flex-col gap-y-2">
        <div class="flex flex-row justify-between">
          <label for="showScoreLabelsSwitch">ShowScoresLabels</label>
          <ToggleSwitch inputId="showScoreLabelsSwitch" v-model="bracketMatch.showScoresLabels" />
        </div>
        <div class="flex flex-row justify-between">
          <label for="scoreBooleanSwitch">ScoreBoolean</label>
          <ToggleSwitch inputId="scoreBooleanSwitch" v-model="bracketMatch.scoreBoolean" />
        </div>
        <div class="flex flex-row justify-between">
          <label for="showScheduledTimeSwitch">ShowScheduledTime</label>
          <ToggleSwitch inputId="showScheduledTimeSwitch" v-model="bracketMatchShowScheduledTime" />
        </div>
        <div class="flex flex-row justify-between">
          <label for="editModeSwitch">Edit Mode</label>
          <ToggleSwitch inputId="editModeSwitch" v-model="bracketMatch.editMode" />
        </div>
        <div class="flex flex-col">
          <div class="flex flex-row justify-between">
            <label for="matchStatusSelect">Match Status</label>
            <Select
              inputId="matchStatusSelect"
              v-model="bracketMatch.status"
              :options="
                Object.values(MatchStatus).filter((item) => {
                  return isNaN(Number(item))
                })
              "
              placeholder="Status"
            ></Select>
          </div>
          <div class="flex flex-row justify-between">
            <label for="bestOfSelect">Best Of</label>
            <Select
              input-id="bestOfSelect"
              v-model="bracketMatch.bestOf"
              :options="[1, 3, 5]"
              placeholder="Best Of"
            ></Select>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <label for="alignmentSelect">Alignment</label>
          <Select
            input-id="alignmentSelect"
            v-model="bracketMatchAlignment"
            :options="['left', 'right']"
            placeholder="Alignment"
          ></Select>
        </div>
        <div class="flex flex-row justify-between">
          <label for="scoresCountSelect">Score Count</label>
          <Select
            input-id="scoresCountSelect"
            v-model="bracketMatch.scoresCount"
            :options="[1, 2, 3, 4, 5]"
            placeholder="Score Count"
          ></Select>
        </div>
      </div>
      <div class="mt-10">
        <BestOfMatch
          @confirm-edit="confirmEditMode"
          :entrants="bracketMatch.entrants"
          :entrant-count="bracketMatch.entrantsCount"
          :scores="bracketMatch.scores"
          :scores-labels="bracketMatch.scoresLabels"
          :show-scores-labels="bracketMatch.showScoresLabels"
          :scores-count="bracketMatch.scoresCount"
          :status="bracketMatch.status"
          :edit-mode="bracketMatch.editMode"
          :scheduled-start-time="bracketMatch.scheduledStartTime"
          :scheduled-end-time="bracketMatch.scheduledEndTime"
          :show-scheduled-time="bracketMatchShowScheduledTime"
          :real-start-time="bracketMatch.realStartTime"
          :real-end-time="bracketMatch.realEndTime"
          :best-of="bracketMatch.bestOf"
          :winner="bracketMatch.winner"
          :best-scores="bracketMatch.bestScores"
          :score-boolean="bracketMatch.scoreBoolean"
          class="match-item"
          :align="bracketMatchAlignment"
        ></BestOfMatch>
      </div>
    </div>
    <div class="flex flex-col">
      <h1 class="underline font-bold">BestOfMatch</h1>
      <div class="flex flex-col gap-y-2">
        <div class="flex flex-row justify-between">
          <label for="showScoreLabelsSwitch">ShowScoresLabels</label>
          <ToggleSwitch
            inputId="showScoreLabelsSwitch"
            v-model="singleEntrantMatch.showScoresLabels"
          />
        </div>
        <div class="flex flex-row justify-between">
          <label for="showScheduledTimeSwitch">ShowScheduledTime</label>
          <ToggleSwitch
            inputId="showScheduledTimeSwitch"
            v-model="singleEntrantMatchShowScheduledTime"
          />
        </div>
        <div class="flex flex-col">
          <div class="flex flex-row justify-between">
            <label for="matchStatusSelect">Match Status</label>
            <Select
              inputId="matchStatusSelect"
              v-model="singleEntrantMatch.status"
              :options="
                Object.values(MatchStatus).filter((item) => {
                  return isNaN(Number(item))
                })
              "
              placeholder="Status"
            ></Select>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <SingleEntrantMatch
          :entrant="singleEntrantMatch.entrant"
          :scores="singleEntrantMatch.scores"
          :scoresLabels="singleEntrantMatch.scoresLabels"
          :score-boolean="singleEntrantMatch.scoreBoolean"
          :attempts="singleEntrantMatch.attempts"
          :best-scores="singleEntrantMatch.bestScores"
          :status="singleEntrantMatch.status"
          :scheduled-start-time="singleEntrantMatch.scheduledStartTime"
          :scheduled-end-time="singleEntrantMatch.scheduledEndTime"
          :show-scheduled-time="singleEntrantMatchShowScheduledTime"
          :real-start-time="singleEntrantMatch.realStartTime"
          :real-end-time="singleEntrantMatch.realEndTime"
          class="match-item"
        ></SingleEntrantMatch>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
