<template>
  <div class="h-screen">
    <img
      :src="`data:${backgroundImage.mimeType};base64,${backgroundImage.imageData}`"
      class="object-cover w-full h-full opacity-50"
      alt=""
    />
    <div id="tournament-container" class="w-full h-screen">
      <div class="flex flex-col w-full h-screen">
        <TournamentHeader
          :name="name"
          :game-logo-image="gameLogoImage"
          :platform-image="platformImage"
        ></TournamentHeader>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import TournamentHeader from "@/components/TournamentHeader/TournamentHeader.vue";
import type { ImageData } from "@/shared/models/ImageData.ts";

const TournamentContainer = defineComponent({
  components: { TournamentHeader },
  props: {
    name: String,
    backgroundImage: {
      type: Object as PropType<ImageData>,
      default: () => ({
        mimeType: "",
        imageData: "",
      }),
    },
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
export default TournamentContainer;
</script>

<style scoped>
#tournament-container {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
