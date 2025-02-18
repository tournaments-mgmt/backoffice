<template>
  <div
    class="flex flex-col justify-between item-center overflow-x-auto bg-white shadow rounded-lg h-13 relative"
    :class="{
      'flex-row': align === 'left',
      'flex-row-reverse': align === 'right',
      'pulse red': status === MatchStatus.RUNNING,
    }"
  >
    <MatchEntrant
      :align="align"
      :best-of="1"
      :best-scores="bestScores"
      :edit-mode="editMode"
      :entrant="entrant"
      :real-end-time="realEndTime"
      :real-start-time="realStartTime"
      :scheduled-end-time="scheduledEndTime"
      :scheduled-start-time="scheduledStartTime"
      :score-boolean="scoreBoolean"
      :scores="scores"
      :scores-count="scoresCount"
      :scoresLabels="scoresLabels"
      :show-scheduled-time="showScheduledTime"
      :show-scores-labels="showScoresLabels"
      :status="status"
    ></MatchEntrant>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Entrant } from '@/shared/models/Entrant.ts'
import { MatchStatus } from '@/shared/constants/MatchStatus.ts'
import moment from 'moment'
import MatchEntrant from '@/components/MatchEntrant/MatchEntrant.vue'

const SingleEntrantMatch = defineComponent({
  components: { MatchEntrant },
  props: {
    align: { type: String, default: 'left' },
    attempts: { type: Number, default: 1 },
    bestScores: { type: Array as PropType<Array<number>>, default: () => [] },
    editMode: { type: Boolean, default: false },
    entrant: { type: Object as PropType<Entrant>, default: () => ({}), required: true },
    realEndTime: { type: Number, default: () => null },
    realStartTime: { type: Number, default: () => null },
    scheduledEndTime: { type: Number, default: () => null },
    scheduledStartTime: { type: Number, default: () => null },
    scoreBoolean: { type: Boolean, default: () => false },
    scores: {
      type: Array as PropType<Array<Array<unknown>>>,
      default: () => [[]],
    },
    scoresCount: { type: Number, default: 1 },
    scoresLabels: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    showScheduledTime: { type: Boolean, default: () => true },
    showScoresLabels: { type: Boolean, default: () => true },
    status: {
      type: String as PropType<MatchStatus>,
      default: () => MatchStatus.SCHEDULED,
    },
  },
  setup() {
    return { MatchStatus: MatchStatus }
  },
  methods: {
    formatTime(time: number) {
      return moment(time).format('HH:mm')
    },
  },
})
export default SingleEntrantMatch
</script>

<style scoped></style>
