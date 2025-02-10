<script lang="ts">
import { defineComponent } from "vue";
import ShowCaseManager from '@/components/ShowCaseManager.vue'

const ShowCaseComponent = defineComponent({
  components: {
    ShowCaseManager,
  },
});
export default ShowCaseComponent;
</script>

<template>
  <ShowCaseManager :tag="$route.params.tag" />
</template>

<style scoped></style>
