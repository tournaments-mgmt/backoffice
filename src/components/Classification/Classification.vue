<template>
  <div class="flex flex-col divide-y">
    <div
      class="py-2 px-4 flex justify-between font-semibold items-center bg-white rounded-t-lg flex-row"
      :style="{ 'background-color': color }"
    >
      <p>
        {{ name }}
      </p>
      <div class="flex flex-row">
        <div
          class="flex flex-col px-2 w-10 justify-center items-center"
          v-for="(label, index) of resultsLabels"
          :key="index"
        >
          {{ label }}
        </div>
      </div>
    </div>
    <ClassificationItem
      v-for="(entrant, index) of entrants"
      :key="index"
      :name="entrant.name"
      :position="entrant.position"
      :results="entrant.results"
      :color="entrant.color"
      class="single-entrant-item"
      :class="{
        'first-position':
          top.includes(entrant.position) && entrant.position === 1,
        'second-position':
          top.includes(entrant.position) && entrant.position === 2,
        'third-position':
          top.includes(entrant.position) && entrant.position === 3,
      }"
    >
    </ClassificationItem>
    <div
      class="flex justify-between items-center bg-white rounded-b-lg flex-row h-5"
      :style="{ 'background-color': color }"
    ></div>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { ClassificationEntrant } from "@/shared/models/Entrant.ts";
import ClassificationItem from "@/components/ClassificationItem/ClassificationItem.vue";

const Classification = defineComponent({
  components: { ClassificationItem },
  props: {
    name: { type: String, default: () => "" },
    color: { type: String, default: () => "#aaaaaa" },
    entrants: {
      type: Array as PropType<Array<ClassificationEntrant>>,
      default: () => [],
    },
    resultsLabels: { type: Array, default: () => [] },
    top: { type: Array, default: () => [1, 2, 3] },
  },
});
export default Classification;
</script>

<style scoped>
.single-entrant-item {
  /*width: calc(100% - 1.5rem);*/
  min-height: 50px;
}

.first-position {
  background-color: Gold;
  background-image: linear-gradient(90deg, Gold, #ccb332);
}

.second-position {
  background-color: Silver;
  background-image: linear-gradient(90deg, Silver, Silver);
}

.third-position {
  background-color: #dc5f36;
  background-image: linear-gradient(315deg, #dc5f36 0%, #f2a65a 74%);
}
</style>
