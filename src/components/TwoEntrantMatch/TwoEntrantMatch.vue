<template>
  <div
    class="p-2 flex flex-row justify-between bg-white shadow rounded-lg items-center match-item"
    :style="{
      'background-image': `-webkit-linear-gradient(left, ${
        entrants[0]?.color || 'transparent'
      }, ${
        entrants[0]?.color || 'transparent'
      } 0.5rem, transparent 0.5rem, transparent 100%), -webkit-linear-gradient(right, ${
        entrants[1]?.color || 'transparent'
      }, ${
        entrants[1]?.color || 'transparent'
      } 0.5rem, transparent 0.5rem, transparent 100%)`,
    }"
  >
    <div class="flex flex-row justify-between items-center w-1/2">
      <div class="flex flex-row items-center">
        <div>
          <p
            class="entrant-name ml-2 text-gray-700 font-semibold font-sans tracking-wide"
          >
            {{ entrants[0]?.name || "-" }}
          </p>
        </div>
      </div>
      <div v-if="status === MatchStatus.COMPLETED">
        <div class="flex items-center justify-between">
          <div
            v-for="(scoreBestOf, scoreBestOfIndex) in scores[0] || []"
            :key="scoreBestOfIndex"
            class="h-full flex flex-row items-center"
          >
            <div
              v-for="(scoreMatch, scoreMatchIndex) in scoreBestOf"
              :key="scoreMatchIndex"
              class="flex flex-col entrant-score justify-center items-center px-1"
            >
              <p
                v-if="showScoresLabels && scoresLabels.length > 0"
                class="text-gray-700 text-center font-sans tracking-wide"
              >
                {{ scoresLabels[scoreMatchIndex] || "" }}
              </p>
              <p
                class="entrant-score text-center text-gray-700 font-semibold font-sans tracking-wide"
                v-if="!scoreBoolean"
              >
                {{ scoreMatch === undefined ? "-" : scoreMatch }}
              </p>
              <div v-else-if="scoreBoolean" class="p-1">
                <div
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
    <div v-if="status === MatchStatus.COMPLETED"><p>:</p></div>
    <div
      v-if="status === MatchStatus.SCHEDULED || status === MatchStatus.RUNNING"
    >
      <p>{{ (showScheduledTime && scheduledStartTime) ?  formatTime(scheduledStartTime) : ""}}</p>
    </div>
    <div v-if="status === MatchStatus.CANCELED">
      <p class="text-red-500">CANCELED</p>
    </div>
    <div class="flex flex-row-reverse justify-between items-center w-1/2">
      <div class="flex flex-row-reverse items-center">
        <p
          class="entrant-name mr-2 text-gray-700 font-semibold font-sans tracking-wide"
        >
          {{ entrants[1]?.name || "-" }}
        </p>
      </div>
      <div v-if="status === MatchStatus.COMPLETED" class="flex flex-row">
        <div class="flex flex-row-reverse items-center justify-between">
          <div
            v-for="(scoreBestOf, scoreBestOfIndex) in scores[1] || []"
            :key="scoreBestOfIndex"
            class="h-full flex flex-row items-center"
          >
            <div
              v-for="(scoreMatch, scoreMatchIndex) in scoreBestOf"
              :key="scoreMatchIndex"
              class="flex flex-col entrant-score justify-center items-center px-1"
            >
              <p
                v-if="showScoresLabels && scoresLabels.length > 0"
                class="text-gray-700 text-center font-sans tracking-wide"
              >
                {{ scoresLabels[scoreMatchIndex] || "" }}
              </p>
              <p
                class="entrant-score text-center text-gray-700 font-semibold font-sans tracking-wide"
                v-if="!scoreBoolean"
              >
                {{ scoreMatch === undefined ? "-" : scoreMatch }}
              </p>
              <div v-else-if="scoreBoolean" class="p-1">
                <div
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
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { Entrant } from "@/shared/models/Entrant.ts";
import { MatchStatus } from "@/shared/constants/MatchStatus.ts";
import moment from "moment";

const SingleMatch = defineComponent({
  props: {
    entrants: { type: Array as PropType<Array<Entrant>>, default: () => [] },
    scores: {
      type: Array as PropType<Array<Array<Object>>>,
      default: () => [],
    },
    scoresLabels: {
      type: Array as PropType<Array<String>>,
      default: () => [],
    },
    scoresCount: { type: Number, default: () => 1 },
    scoreBoolean: { type: Boolean, default: () => false },
    winner: { type: Number, default: () => null },
    showScoresLabels: { type: Boolean, default: () => false },
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
  setup(props) {
    return { MatchStatus: MatchStatus };
  },
  methods: {
    formatTime(time: number) {
      return moment(time).format("HH:mm");
    },
  },
});
export default SingleMatch;
</script>

<style scoped lang="scss">
.entrant-avatar {
  font-size: 24px;
  font-weight: 500;
  color: #fff;
}

.match-item {
  min-height: 64px;
}

.entrant-score {
  min-width: 24px;
}
</style>
