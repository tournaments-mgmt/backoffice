<template>
  <div
    class="bg-background-light flex flex-col min-h-screen items-center"
    id="app-container"
  >
    <div id="main-container" class="flex flex-grow flex-col w-full">
      <slot />
    </div>
  </div>
  <TheFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheFooter from "./TheFooter.vue";

const TheLayout = defineComponent({
  components: { TheFooter },
});
export default TheLayout;
</script>

<style scoped></style>
