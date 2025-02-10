<template>
  <div class="w-full flex flex-col">
    <TransitionContainer transition="left">
      <div
        class="w-full h-full flex flex-row entrant-list justify-between"
        :key="currentView"
        v-if="currentView === currentView"
      >
        <div
          class="px-4 w-full h-avail flex flex-col justify-start"
          v-for="i in columnPerView"
          :key="i"
        >
          <Classification
            v-if="entrantList[i - 1].length > 0"
            :entrants="entrantList[i - 1]"
            :results-labels="resultsLabels"
            :top="top"
          >
          </Classification>
        </div>
      </div>
    </TransitionContainer>
  </div>
</template>
<script lang="ts">
import type { PropType } from "vue";
import { computed, ref } from "vue";
import type { Entrant } from "@/shared/models/Entrant.ts";
import { defineComponent } from "vue";
import { AnimationType } from '@/shared/constants/AnimationType.ts'
import TransitionContainer from "@/components/TransitionContainer/TransitionContainer.vue";
import Classification from "@/components/Classification/Classification.vue";
import { MatchStatus } from '@/shared/constants/MatchStatus.ts'

let viewInterval: any;
const TournamentClassification = defineComponent({
  components: {
    TransitionContainer,
    Classification,
  },
  props: {
    name: { type: String, default: () => "" },
    color: { type: String, default: () => "#eeeeee" },
    entrants: {
      type: Array as PropType<Array<Entrant>>,
      default: () => [],
    },
    itemsPerColumn: { type: Number, default: () => 20 },
    columnPerView: { type: Number, default: () => 3 },
    duration: { type: Number, required: true },
    resultsLabels: { type: Array },
    top: { type: Array },
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
      return props.entrants.length;
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

    const entrantList = computed(() => {
      const temp = paginate(
        props.entrants,
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
      entrantList,
      viewDuration,
      MatchStatus: MatchStatus,
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
export default TournamentClassification;
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
</style>
