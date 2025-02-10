<template>
  <div class="w-full">
    <TransitionContainer transition="left">
      <div
        class="w-full h-avail flex flex-row entrant-list"
        :key="currentView"
        v-if="currentView === currentView"
      >
        <div class="grow flex flex-col justify-around px-4" v-for="i in columnPerView" :key="i">
          <Classification
            v-for="group of groupsList[i - 1]"
            :key="group.name"
            :name="group.name"
            :entrants="group.entrants"
            :results-labels="resultsLabels"
            :top="top"
            :color="group.color"
          ></Classification>
        </div>
      </div>
    </TransitionContainer>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import TransitionContainer from '@/components/TransitionContainer/TransitionContainer.vue'
import type { Group } from '@/shared/models/Group.ts'
import Classification from '@/components/Classification/Classification.vue'
import { AnimationType } from '@/shared/constants/AnimationType.ts'

const TournamentGroups = defineComponent({
  components: {
    Classification,
    TransitionContainer,
  },
  props: {
    name: String,
    groups: {
      type: Array as PropType<Array<Group>>,
      default: () => [],
    },
    resultsLabels: { type: Array, default: () => [] },
    top: { type: Array, default: () => [1] },
    itemsPerColumn: { type: Number, default: () => 2 },
    columnPerView: { type: Number, default: () => 2 },
    animationType: {
      type: String as PropType<AnimationType>,
      default: () => AnimationType.SCROLL,
    },
  },
  setup(props) {
    const itemsPerView = computed(() => {
      return Math.min(props.itemsPerColumn * props.columnPerView, props.groups?.length)
    })
    const itemsCount = computed(() => {
      return props.groups.length
    })
    const views = computed(() => {
      return Math.ceil(itemsCount.value / itemsPerView.value)
    })

    const currentView = ref(1)

    function paginate(array: any[], page_size: number, page_number: number) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice((page_number - 1) * page_size, page_number * page_size)
    }

    const groupsList = computed(() => {
      let res = []
      const temp = paginate(props.groups, itemsPerView.value, currentView.value)
      for (let i = 1; i <= props.columnPerView; i++) {
        res.push(paginate(temp, props.itemsPerColumn, i))
      }
      return res
    })

    return { itemsCount, views, itemsPerView, currentView, groupsList }
  },
  mounted() {
    if (this.views > 1) {
      setInterval(() => {
        this.currentView = (this.currentView % this.views) + 1
      }, 5000000000)
    }
  },
})
export default TournamentGroups
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
