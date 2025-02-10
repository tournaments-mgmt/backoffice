<template>
  <div class="flex flex-row h-16 justify-between items-center px-3 py-1">
    <div class="h-full w-1/3 flex justify-start">
      <img
        :src="`data:${gameLogoImage.mimeType};base64,${gameLogoImage.imageData}`"
        class="h-full"
        alt=""
      />
    </div>
    <div class="w-1/3 flex justify-center">
      <p>{{ name }}</p>
    </div>
    <div class="h-full w-1/3 flex justify-end">
      <img
        :src="`data:${platformImage.mimeType};base64,${platformImage.imageData}`"
        class="h-full"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { ImageData } from "@/shared/models/ImageData.ts";

const TournamentHeader = defineComponent({
  props: {
    name: { type: String, required: true },
    gameLogoImage: {
      type: Object as PropType<ImageData>,
      default: () => ({
        mimeType: "",
        imageData: "",
      }),
    },
    platformImage: {
      type: Object as PropType<ImageData>,
      default: () => ({
        mimeType: "",
        imageData: "",
      }),
    },
  },
});
export default TournamentHeader;
</script>

<style scoped></style>
