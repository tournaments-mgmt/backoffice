<template>
  <div class="flex flex-row h-avail w-full">
    <div class="flex grow flex-row pl-3">
      <div class="h-full flex flex-col basis-full" v-for="d in round" :key="d">
        <div
          class="flex flex-row"
          :style="{
            height: 100 / rounds.leftTab[d - 1].length + '%',
          }"
          :key="match.phase"
          v-for="(match, index) of rounds.leftTab[d - 1]"
        >
          <div class="flex flex-col justify-items-stretch center w-full">
            <div class="grow"></div>
            <BestOfMatch
              :entrants="match.entrants"
              :entrant-count="match.entrantCount"
              :scores="match.scores"
              :scores-labels="match.scoresLabels"
              :show-scores-labels="match.showScoresLabels"
              :scores-count="match.scoresCount"
              :status="match.status"
              :scheduled-start-time="match.scheduledStartTime"
              :scheduled-end-time="match.scheduledEndTime"
              :show-scheduled-time="showScheduledTime"
              :real-start-time="match.realStartTime"
              :real-end-time="match.realEndTime"
              :best-of="match.bestOf"
              :winner="match.winner"
              :best-scores="match.bestScores"
              :score-boolean="match.scoreBoolean"
              class="match-item"
              :align="'left'"
            ></BestOfMatch>
            <div class="grow"></div>
          </div>
          <div
            class="flex flex-row grow h-full flex-nowrap"
            v-if="match.step > 0"
          >
            <div class="flex flex-col w-4">
              <div class="grow branch-hb"></div>
              <div class="grow"></div>
            </div>
            <div class="flex flex-col w-4">
              <div
                class="grow"
                :class="{
                  'branch-vl': index % 2 === 1 && match.step > 1,
                  'branch-hb': match.step === 1,
                }"
              ></div>
              <div
                class="grow"
                :class="{
                  'branch-vl': index % 2 === 0 && match.step > 1,
                  'branch-hb': index % 2 === 0 && match.step > 1,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex grow flex-row">
      <div class="h-full flex flex-col basis-full justify-center">
        <div class="h-1/3"></div>
        <div class="h-1/3 flex flex-col justify-center">
          <BestOfMatch
            v-if="rounds.finals[0]"
            :entrants="rounds.finals[0].entrants"
            :entrant-count="rounds.finals[0].entrantCount"
            :scores="rounds.finals[0].scores"
            :scores-labels="rounds.finals[0].scoresLabels"
            :show-scores-labels="rounds.finals[0].showScoresLabels"
            :scores-count="rounds.finals[0].scoresCount"
            :status="rounds.finals[0].status"
            :scheduled-start-time="rounds.finals[0].scheduledStartTime"
            :scheduled-end-time="rounds.finals[0].scheduledEndTime"
            :show-scheduled-time="showScheduledTime"
            :real-start-time="rounds.finals[0].realStartTime"
            :real-end-time="rounds.finals[0].realEndTime"
            :best-of="rounds.finals[0].bestOf"
            :winner="rounds.finals[0].winner"
            :best-scores="rounds.finals[0].bestScores"
            :score-boolean="rounds.finals[0].scoreBoolean"
            class="match-item"
            :align="'left'"
          ></BestOfMatch>
        </div>
        <div class="h-1/3 flex flex-col">
          <BestOfMatch
            v-if="rounds.finals[1]"
            :entrants="rounds.finals[1].entrants"
            :entrant-count="rounds.finals[1].entrantCount"
            :scores="rounds.finals[1].scores"
            :scores-labels="rounds.finals[1].scoresLabels"
            :show-scores-labels="rounds.finals[1].showScoresLabels"
            :scores-count="rounds.finals[1].scoresCount"
            :status="rounds.finals[1].status"
            :scheduled-start-time="rounds.finals[1].scheduledStartTime"
            :scheduled-end-time="rounds.finals[1].scheduledEndTime"
            :show-scheduled-time="showScheduledTime"
            :real-start-time="rounds.finals[1].realStartTime"
            :real-end-time="rounds.finals[1].realEndTime"
            :best-of="rounds.finals[1].bestOf"
            :winner="rounds.finals[1].winner"
            :best-scores="rounds.finals[1].bestScores"
            :score-boolean="rounds.finals[1].scoreBoolean"
            class="match-item"
            :align="'left'"
          ></BestOfMatch>
        </div>
      </div>
    </div>
    <div class="flex grow flex-row-reverse justify-between pr-3">
      <div class="h-full flex flex-col basis-full" v-for="d in round" :key="d">
        <div
          class="flex flex-row-reverse"
          :style="{
            height: 100 / rounds.rightTab[d - 1].length + '%',
          }"
          :key="match.phase"
          v-for="(match, index) of rounds.rightTab[d - 1]"
        >
          <div class="flex flex-col justify-center w-full">
            <div class="grow"></div>
            <BestOfMatch
              :entrants="match.entrants"
              :entrant-count="match.entrantCount"
              :scores="match.scores"
              :scores-labels="match.scoresLabels"
              :show-scores-labels="match.showScoresLabels"
              :scores-count="match.scoresCount"
              :status="match.status"
              :scheduled-start-time="match.scheduledStartTime"
              :scheduled-end-time="match.scheduledEndTime"
              :show-scheduled-time="showScheduledTime"
              :real-start-time="match.realStartTime"
              :real-end-time="match.realEndTime"
              :best-of="match.bestOf"
              :winner="match.winner"
              :best-scores="match.bestScores"
              :score-boolean="match.scoreBoolean"
              class="match-item"
              :align="'right'"
            ></BestOfMatch>
            <div class="grow"></div>
          </div>
          <div class="flex flex-row-reverse grow h-full" v-if="match.step > 0">
            <div class="flex flex-col w-4">
              <div class="grow branch-hb"></div>
              <div class="grow"></div>
            </div>
            <div class="flex flex-col w-4">
              <div
                class="grow"
                :class="{
                  'branch-vr': index % 2 === 1 && match.step > 1,
                  'branch-hb': match.step === 1,
                }"
              ></div>
              <div
                class="grow"
                :class="{
                  'branch-vr': index % 2 === 0 && match.step > 1,
                  'branch-hb': index % 2 === 0 && match.step > 1,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { computed, defineComponent, ref } from "vue";
import BestOfMatch from "@/components/BestOfMatch/BestOfMatch.vue";
import { AnimationType } from '@/shared/constants/AnimationType.ts'
import type { BracketMatch, TeamsCount } from "@/shared/models/Match.ts";

const TournamentBrackets = defineComponent({
  components: { BestOfMatch },
  props: {
    name: String,
    matches: {
      type: Array as PropType<Array<BracketMatch>>,
      default: () => [],
    },
    scoreBoolean: { type: Boolean, default: () => true },
    showScheduledTime: { type: Boolean, default: () => true },
    round: { type: Number as PropType<TeamsCount>, required: true },
    animationType: {
      type: String as PropType<AnimationType>,
      default: () => AnimationType.SCROLL,
    },
  },
  setup(props) {
    const rounds = computed(() => {
      let leftTab = [];
      let rightTab = [];
      for (let i = props.round; i > 0; i--) {
        const tempMatch = props.matches.filter(
          (m: BracketMatch) => m.step == i
        );
        if (tempMatch.length > 0) {
          const pivot = Math.ceil(tempMatch.length / 2);
          leftTab.push(tempMatch.splice(0, pivot));
          rightTab.push(tempMatch.splice(-pivot));
        }
      }

      const finals = props.matches
        .filter((m: BracketMatch) => m.phase == 1 && m.step == 0)
        .reverse();
      return { leftTab, rightTab, finals };
    });

    return { rounds };
  },
});
export default TournamentBrackets;
</script>

<style scoped lang="scss">
.branch-hb {
  border-bottom: 1px solid black;
}

.branch-ht {
  border-top: 1px solid black;
}

.branch-vl {
  border-left: 1px solid black;
}

.branch-vr {
  border-right: 1px solid black;
}

.match-item {
  min-width: 160px;
}
</style>
