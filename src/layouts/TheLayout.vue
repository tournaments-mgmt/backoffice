<template>
  <div class="" id="app-container">
    <slot />
  </div>
  <TheFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheFooter from './TheFooter.vue'

const TheLayout = defineComponent({
  components: { TheFooter },
})
export default TheLayout
</script>

<style scoped></style>
