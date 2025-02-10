<template>
  <div class="w-full">
    <TransitionContainer transition="left">
      <div
        class="w-full flex flex-col"
        :key="currentView"
        v-if="currentView === currentView"
      >
        <div
          class="w-full h-screen flex flex-row entrant-list"
          v-for="i in groups[currentView - 1].matches.length"
          :key="i"
        >
          <div class="h-avail flex flex-col grow justify-between pr-2 pl-4">
            <TwoEntrantMatch
              v-for="(match, index) of groups[currentView - 1].matches"
              :key="index"
              :entrants="match.entrants"
              :scores="match.scores"
              :status="match.status"
              :scheduled-start-time="match.scheduledStartTime"
              :scheduled-end-time="match.scheduledEndTime"
              :real-start-time="match.realStartTime"
              :real-end-time="match.realEndTime"
              :score-boolean="scoreBoolean"
              class="match-item mt-2"
            ></TwoEntrantMatch>
          </div>
          <div class="h-avail flex flex-col grow justify-center pr-4 pl-2">
            <Classification
              :key="groups[currentView - 1].group.name"
              :name="groups[currentView - 1].group.name"
              :entrants="groups[currentView - 1].group.entrants"
              :color="groups[currentView - 1].group.color"
              :results-labels="resultsLabels"
              :top="top"
            ></Classification>
          </div>
        </div>
      </div>
    </TransitionContainer>
  </div>
</template>

<script lang="ts">
import type {PropType} from "vue";
import {defineComponent, ref} from "vue";
import TransitionContainer from "@/components/TransitionContainer/TransitionContainer.vue";
import type {MultiplayerMatch} from "@/shared/models/Match.ts";
import type {Group} from "@/shared/models/Group.ts";
import Classification from "@/components/Classification/Classification.vue";
import TwoEntrantMatch from "@/components/TwoEntrantMatch/TwoEntrantMatch.vue";
import { AnimationType } from '@/shared/constants/AnimationType.ts'

const TournamentGroupsAndMatches = defineComponent({
  components: {
    TwoEntrantMatch,
    Classification,
    TransitionContainer,
  },
  props: {
    name: String,
    groups: {
      type: Array as PropType<
        Array<{
          group: Group;
          matches: Array<MultiplayerMatch>;
        }>
      >,
      default: () => [],
    },
    itemsPerColumn: { type: Number, default: () => 2 },
    columnPerView: { type: Number, default: () => 2 },
    scoreBoolean: { type: Boolean, default: () => false },
    resultsLabels: { type: Array, default: () => [] },
    top: { type: Array, default: () => [1] },
    animationType: {
      type: String as PropType<AnimationType>,
      default: () => AnimationType.SCROLL,
    },
  },
  setup() {
    const currentView = ref(1);
    return { currentView };
  },
  mounted() {
    const views = Object.keys(this.groups).length;

    if (views > 1) {
      setInterval(() => {
        this.currentView = (this.currentView % views) + 1;
      }, 5000);
    }
  },
});
export default TournamentGroupsAndMatches;
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
</style>
