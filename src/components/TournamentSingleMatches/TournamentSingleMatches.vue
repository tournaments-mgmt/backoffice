<template>
  <div class="w-full h-screen px-3">
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
          <div v-for="(match, index) of matchList[i - 1]" :key="index">
            <TwoEntrantMatch
              v-if="!singleEntrant"
              :key="index"
              :entrants="match.entrants"
              :scores="match.scores"
              :scoresLabels="match.scoresLabels"
              :score-boolean="match.scoreBoolean"
              :status="match.status"
              :scheduled-start-time="match.scheduledStartTime"
              :scheduled-end-time="match.scheduledEndTime"
              :show-scheduled-time="showScheduledTime"
              :real-start-time="match.realStartTime"
              :real-end-time="match.realEndTime"
              class="match-item mt-2"
            ></TwoEntrantMatch>
            <SingleEntrantMatch
              v-if="singleEntrant"
              :key="index"
              :entrants="match.entrants"
              :scores="match.scores"
              :scoresLabels="match.scoresLabels"
              :score-boolean="match.scoreBoolean"
              :attempts="match.attempts"
              :best-scores="match.bestScores"
              :status="match.status"
              :scheduled-start-time="match.scheduledStartTime"
              :scheduled-end-time="match.scheduledEndTime"
              :show-scheduled-time="showScheduledTime"
              :real-start-time="match.realStartTime"
              :real-end-time="match.realEndTime"
              class="match-item mt-2"
            ></SingleEntrantMatch>
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
import type { MultiplayerMatch } from "@/shared/models/Match.ts";
import TwoEntrantMatch from "@/components/TwoEntrantMatch/TwoEntrantMatch.vue";
import SingleEntrantMatch from "@/components/SingleEntrantMatch/SingleEntrantMatch.vue";

const TournamentSingleMatches = defineComponent({
  components: { SingleEntrantMatch, TransitionContainer, TwoEntrantMatch },
  props: {
    name: String,
    matches: {
      type: Array as PropType<Array<MultiplayerMatch>>,
      default: () => [],
    },
    itemsPerColumn: { type: Number, default: () => 20 },
    columnPerView: { type: Number, default: () => 3 },
    showScheduledTime: { type: Boolean, default: () => true },
    singleEntrant: { type: Boolean, default: () => false },
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
    };
  },

  mounted() {
    if (this.views > 1) {
      setInterval(() => {
        this.currentView = (this.currentView % this.views) + 1;
      }, 5000);
    }
  },
});
export default TournamentSingleMatches;
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
  min-height: 64px;
}
</style>
