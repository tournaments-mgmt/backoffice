<template>
  <div
    class="p-2 flex flex-row justify-between bg-white shadow rounded-lg items-center"
    :style="{
      'background-image': `-webkit-linear-gradient(left, ${entrant.color}, ${entrant.color} 0.5rem, transparent 0.5rem, transparent 100%)`,
    }"
  >
    <div class="flex flex-row items-center w-full">
      <div
        class="h-full w-auto flex items-center justify-between p-2"
        :style="{ 'background-color': entrant.color }"
      >
        <i class="pi pi-user"></i>
      </div>
      <div class="flex flex-row items-center">
        <div>
          <p class="entrant-name ml-2 text-gray-700 font-semibold font-sans tracking-wide">
            {{ entrant.name }}
          </p>
        </div>
      </div>
      <div v-if="status === MatchStatus.COMPLETED">
        <div
          v-if="scores.length > 0"
          class="flex flex-row justify-center items-center divide-x h-1/2"
        >
          <div class="h-full flex justify-center items-center divide-x">
            <div
              v-for="(scoreBestOf, scoreBestOfIndex) in scores"
              :key="scoreBestOfIndex"
              class="h-full flex flex-row items-center"
              :class="{ 'best-score': bestScores[scoreBestOfIndex] === 0 }"
            >
              <div
                v-for="(scoreMatch, scoreMatchIndex) in scoreBestOf"
                :key="scoreMatchIndex"
                class="flex flex-col entrant-score justify-center items-center px-1"
              >
                <p
                  v-if="scoresLabels.length > 0"
                  class="text-gray-700 text-center font-sans tracking-wide"
                >
                  {{ scoresLabels[scoreMatchIndex] || '' }}
                </p>
                <p
                  class="entrant-score text-center text-gray-700 font-semibold font-sans tracking-wide"
                  v-if="!scoreBoolean"
                >
                  {{ scoreMatch === undefined ? '-' : scoreMatch }}
                </p>
                <div v-else-if="scoreBoolean" class="p-1">
                  <p v-if="!scoreMatch">-</p>
                  <div
                    v-else
                    class="w-3 h-3 rounded-full"
                    :class="{
                      'bg-emerald-500': scoreMatch,
                      'bg-transparent': !scoreMatch,
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="status === MatchStatus.SCHEDULED || status === MatchStatus.RUNNING">
        <p>{{ showScheduledTime && scheduledStartTime ? formatTime(scheduledStartTime) : '' }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Entrant } from '@/shared/models/Entrant.ts'
import { MatchStatus } from '@/shared/constants/MatchStatus.ts'
import moment from 'moment'

const SingleEntrantMatch = defineComponent({
  props: {
    entrant: { type: Object as PropType<Entrant>, default: () => ({}), required: true },
    scores: {
      type: Array as PropType<Array<Array<unknown>>>,
      default: () => [[]],
    },
    scoresLabels: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },

    attempts: { type: Number, default: () => 1 },
    bestScores: { type: Array as PropType<Array<number>>, default: () => [] },
    scoreBoolean: { type: Boolean, default: () => false },
    status: {
      type: String as PropType<MatchStatus>,
      default: () => MatchStatus.SCHEDULED,
    },
    scheduledStartTime: { type: Number, default: () => null },
    scheduledEndTime: { type: Number, default: () => null },
    showScheduledTime: { type: Boolean, default: () => true },
    realStartTime: { type: Number, default: () => null },
    realEndTime: { type: Number, default: () => null },
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

<style scoped>
.entrant-score {
  min-width: 24px;
}
.best-score * {
  color: red;
}
</style>
