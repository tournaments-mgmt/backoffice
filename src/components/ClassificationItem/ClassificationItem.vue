<template>
  <div
    class="py-2 px-4 flex justify-between items-center bg-white shadow"
    :style="{ 'background-image': colorTag }"
  >
    <div class="flex flex-row items-center">
      <div v-if="!!position">
        <p
          class="ml-2 entrant-position w-10 text-gray-700 font-semibold font-sans tracking-wide"
        >
          {{ position }}°
        </p>
      </div>
      <div>
        <p
          class="entrant-name ml-2 text-gray-700 font-semibold font-sans tracking-wide"
        >
          {{ name }}
        </p>
      </div>
    </div>
    <div class="flex flex-row">
      <div
        class="flex flex-col px-2 w-10 justify-center items-center"
        v-for="(score, index) in results"
        :key="index"
      >
        <p
          class="entrant-score text-gray-700 font-semibold font-sans tracking-wide"
        >
          {{ score }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { ref } from "vue";

const ClassificationItem = defineComponent({
  props: {
    position: { type: Number, required: false },
    name: { type: String, required: true },
    color: { type: String, required: true },
    results: { type: Array, default: () => [] },
    align: {
      type: String,
      default: () => "left",
    },
  },
  setup(props) {
    const colorTag = computed(() => {
      return `-webkit-linear-gradient(left, ${props.color}, ${props.color} 0.5rem, transparent 0.5rem, transparent 100%)`;
    });
    return { colorTag };
  },
});

export default ClassificationItem;
</script>
<style scoped lang="scss">
.entrant-avatar {
  font-size: 24px;
  font-weight: 500;
  color: #fff;
}
</style>
