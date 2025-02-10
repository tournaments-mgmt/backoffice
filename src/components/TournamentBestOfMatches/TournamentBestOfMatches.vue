<template>
  <div class="w-full h-screen flex px-3">
    <TransitionContainer transition="left">
      <div
        class="w-full h-full flex flex-row entrant-list"
        :key="currentView"
        v-if="currentView === currentView"
      >
        <div
          class="w-full h-avail flex flex-col justify-start"
          v-for="i in columnPerView"
          :key="i"
        >
          <div
            v-for="(match, index) of matchList[i - 1]"
            :key="index"
            class="flex items-center"
          >
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
              class="match-item mt-2"
              :align="'left'"
            ></BestOfMatch>
          </div>
        </div>
      </div>
    </TransitionContainer>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { computed, defineComponent, ref } from "vue";
import TransitionContainer from "@/components/TransitionContainer/TransitionContainer.vue";
import { AnimationType } from '@/shared/constants/AnimationType.ts'
import BestOfMatch from "@/components/BestOfMatch/BestOfMatch.vue";
import type { MultiplayerMatch } from "@/shared/models/Match.ts";

let viewInterval: any;

const TournamentBestOfMatches = defineComponent({
  components: { BestOfMatch, TransitionContainer },
  props: {
    name: String,
    matches: {
      type: Array as PropType<Array<MultiplayerMatch>>,
      default: () => [],
    },
    itemsPerColumn: { type: Number, default: () => 8 },
    columnPerView: { type: Number, default: () => 3 },
    duration: { type: Number, required: true },
    scoreBoolean: { type: Boolean, default: () => false },
    showScheduledTime: { type: Boolean, default: () => true },
    winner: { type: String, default: () => "" },
    animationType: {
      type: String as PropType<AnimationType>,
      default: () => AnimationType.SCROLL,
    },
  },
  setup(props) {
    const itemsPerView = computed(() => {
      return props.itemsPerColumn * props.columnPerView;
    });
    const itemsCount = computed(() => {
      return props.matches.length;
    });
    const views = computed(() => {
      return Math.ceil(itemsCount.value / itemsPerView.value);
    });
    const currentView = ref(1);
    const viewDuration = ref(props.duration / views.value);

    function paginate(array: any[], page_size: number, page_number: number) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    }

    const matchList = computed(() => {
      const temp = paginate(
        props.matches,
        itemsPerView.value,
        currentView.value
      );
      const res = [];

      for (let i = 1; i <= props.columnPerView; i++) {
        res.push(paginate(temp, props.itemsPerColumn, i));
      }
      return res;
    });

    return {
      itemsCount,
      views,
      itemsPerView,
      currentView,
      matchList,
      viewDuration,
    };
  },

  mounted() {
    if (this.views > 1) {
      viewInterval = setInterval(() => {
        this.currentView = (this.currentView % this.views) + 1;
      }, this.viewDuration);
    }
  },
  unmounted() {
    if (viewInterval) {
      clearInterval(viewInterval);
    }
  },
});
export default TournamentBestOfMatches;
</script>

<style scoped lang="scss">
#tournament-container {
  position: absolute;
  top: 0;
  left: 0;
}

.entrant-list {
  position: fixed;
}

.match-item {
  width: calc(100% - 1.5rem);
}

.winner {
  background-color: #045de9;
  background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%);
}
</style>
