<template>
  <div class="h-screen">
    <img
      v-if="!!backgroundImage"
      :src="`data:${backgroundImage.mimeType};base64,${backgroundImage.imageData}`"
      class="object-cover w-full h-full opacity-30"
      alt=""
    />
    <div
      id="text-container"
      class="flex flex-col h-screen w-full items-center justify-center"
    >
      <h1 class="text" :style="{ color: titleColor }" v-if="!!title">
        {{ title.replace(/\\n/g, "\n")}}
      </h1>
      <h2 class="text" :style="{ color: subTitleColor }" v-if="!!subTitle">
        {{ subTitle.replace(/\\n/g, "\n") }}
      </h2>
      <p class="text" :style="{ color: textMessageColor }" v-if="!!textMessage">
        {{ textMessage }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { ImageData } from "@/shared/models/ImageData.ts";

const TextPane = defineComponent({
  props: {
    title: String,
    titleColor: { type: String, default: () => "#000000" },
    subTitle: String,
    subTitleColor: { type: String, default: () => "#000000" },
    textMessage: String,
    textMessageColor: { type: String, default: () => "#000000" },
    backgroundImage: {
      type: Object as PropType<ImageData>,
      default: () => ({
        mimeType: "",
        imageData: "",
      }),
    },
  },
});
export default TextPane;
</script>

<style scoped>
#text-container {
  position: absolute;
  top: 0;
  left: 0;
    color: grey;
}

.text {
  font-family: "Montserrat", sans-serif;
  white-space: pre-line;
}

h1.text,
h2.text {
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.2em;
  letter-spacing: 8px;
  text-align: center;
}

h1.text {
  font-size: 4vw;
}

h2.text {
  font-size: 24px;
}

p.text {
  font-size: 18px;
}
</style>
