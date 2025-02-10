<template>
  <div
    class="flex justify-between item-center bg-white shadow rounded-lg"
    :class="{
      'flex-row': align === 'left',
      'flex-row-reverse': align === 'right',
      'pulse red': status === MatchStatus.RUNNING,
    }"
  >
    <div class="flex flex-col divide-y justify-around w-full h-auto match-item">
      <div
        v-for="(entrant, index) in entrants.concat(
          Array(entrantCount - entrants.length).fill({})
        )"
        :key="index"
        class="flex items-center justify-between py-1 px-2"
        :style="{ 'background-image': entrantsColorTag[index] }"
        :class="{
          'flex-row': align === 'left',
          'flex-row-reverse': align === 'right',
          'rounded-t-lg': index === 0,
          'rounded-b-lg': index === entrantCount - 1,
        }"
      >
        <div>
          <p
            :class="{ 'ml-2': align === 'left', 'mr-2': align === 'right' }"
            class="entrant-name text-gray-700 font-semibold font-sans tracking-wide"
          >
            {{ entrant?.name || "-" }}
          </p>
        </div>
        <div class="h-full flex justify-center items-center divide-x">
          <div
            v-for="(scoreBestOf, scoreBestOfIndex) in fixedScores[index]"
            :key="scoreBestOfIndex"
            class="h-full flex flex-row items-center"
            :class="{ 'best-score': bestScores[scoreBestOfIndex] === index }"
          >
            <div
              v-for="(scoreMatch, scoreMatchIndex) in scoreBestOf"
              :key="scoreMatchIndex"
              class="flex flex-col entrant-score justify-center items-center px-1"
            >
              <p
                v-if="showScoresLabels && scoresLabels.length > 0"
                class="text-gray-700 font-sans tracking-wide"
              >
                {{ scoresLabels[scoreMatchIndex] || "" }}
              </p>
              <div
                v-if="
                  status === MatchStatus.COMPLETED ||
                  status === MatchStatus.RUNNING
                "
              >
                <p
                  class="entrant-score text-gray-700 font-semibold font-sans tracking-wide"
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
              <div v-if="status === MatchStatus.SCHEDULED">
                <div class="p-1">
                  <div class="w-3 h-3 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="status === MatchStatus.SCHEDULED"
      class="flex justify-between items-center p-4 font-bold text-xl"
    >
      <p>
        {{
          showScheduledTime && scheduledStartTime
            ? formatTime(scheduledStartTime)
            : ""
        }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { computed, defineComponent } from "vue";
import type { Entrant } from "@/shared/models/Entrant.ts";
import { MatchStatus } from "@/shared/constants/MatchStatus.ts";
import moment from "moment/moment";

const BestOfMatch = defineComponent({
  props: {
    id: { type: Number, required: false },
    entrants: { type: Array as PropType<Array<Entrant>>, default: () => [] },
    scores: {
      type: Array as PropType<Array<Array<Array<any>>>>,
      required: false,
      default: () => [],
    },
    scoresLabels: {
      type: Array as PropType<Array<String>>,
      default: () => [],
    },
    showScoresLabels: { type: Boolean, default: () => false },
    scoresCount: { type: Number, default: () => 1 },
    entrantCount: { type: Number, default: () => 2 },
    bestOf: { type: Number, default: () => 1 },
    scheduledStartTime: { type: Number, default: () => null },
    scheduledEndTime: { type: Number, default: () => null },
    showScheduledTime: { type: Boolean, default: () => true },
    realStartTime: { type: Number, default: () => null },
    realEndTime: { type: Number, default: () => null },
    status: {
      type: String as PropType<MatchStatus>,
      default: () => MatchStatus.SCHEDULED,
    },
    scoreBoolean: { type: Boolean, default: () => false },
    winner: { type: Number, required: false },
    bestScores: { type: Array as PropType<Array<Number>>, default: () => [] },
    align: { type: String, default: () => "left" },
  },
  setup(props) {
    const entrantsColorTag = computed(() => {
      return props.entrants.map((e, index) => {
        return !e
          ? ""
          : `-webkit-linear-gradient(${
              props.align === "left" ? "left" : "right"
            }, ${e.color}, ${e.color} 0.5rem, ${
              props.winner === index ? e.color + "50" : "transparent"
            } 0.5rem, ${
              props.winner === index ? e.color + "50" : "transparent"
            } 100%)`;
      });
    });

    //-webkit-linear-gradient(left, rgb(97, 145, 51), rgb(97, 145, 51) 0.5rem,  rgb(97, 145, 51, 0.4) 0.5rem, rgb(97, 145, 51, 0.4)  100%);
    // -webkit-linear-gradient(left, rgb(97, 145, 51), rgb(97, 145, 51) 0.5rem, transparent 0.5rem, transparent 100%);

    const fixedScores = computed(() => {
      const tempScores = props.scores.concat(
        Array(props.entrantCount - props.scores.length).fill([])
      );
      for (let [index, _] of tempScores.entries()) {
        tempScores[index] = tempScores[index].concat(
          Array(props.bestOf - tempScores[index].length).fill([])
        );
        for (let [internalIndex, __] of tempScores[index].entries()) {
          tempScores[index][internalIndex] = tempScores[index][
            internalIndex
          ].concat(
            Array(
              props.scoresCount - tempScores[index][internalIndex].length
            ).fill(undefined)
          );
        }
      }
      return tempScores;
    });
    return {
      MatchStatus: MatchStatus,
      entrantsColorTag,
      fixedScores,
    };
  },
  methods: {
    formatTime(time: number) {
      return moment(time).format("HH:mm");
    },
  },
});
export default BestOfMatch;
</script>
<style scoped lang="scss">
.match-item {
  min-height: 64px;
}
.best-score * {
  color: red;
}

.pulse {
  background: black;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: pulse-black 2s infinite;
}


.pulse.red {
  background: rgba(255, 102, 102, 1);
  box-shadow: 0 0 0 0 rgba(255, 102, 102, 1);
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 102, 102, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 102, 102, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 102, 102, 0);
  }
}
</style>
