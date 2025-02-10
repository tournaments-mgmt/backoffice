<template>
  <div
    class="py-2 px-4 flex justify-between items-center bg-white shadow rounded-lg"
    :style="{ 'background-image': colorTag }"
  >
    <div class="flex flex-row items-center">
      <div>
        <p
          class="entrant-name ml-2 text-gray-700 font-semibold font-sans tracking-wide"
        >
          {{ name }}
        </p>
      </div>
    </div>
    <div class="flex flex-row">
      <div class="flex px-2 w-10 justify-center items-center">
        <div
          class="w-6 h-6 rounded-full"
          :class="{
            'bg-emerald-500': available,
            'bg-red-500': !available,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";

const EntrantItem = defineComponent({
  props: {
    name: { type: String, required: true },
    color: { type: String, required: true },
    type: { type: String, required: true },
    available: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props) {
    const colorTag = computed(() => {
      return `-webkit-linear-gradient(left, ${props.color}, ${props.color} 0.5rem, transparent 0.5rem, transparent 100%)`;
    });
    return { colorTag };
  },
});

export default EntrantItem;
</script>
<style scoped lang="scss"></style>
