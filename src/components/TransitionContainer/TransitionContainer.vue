<template>
  <Transition appear :name="transition">
    <slot></slot>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const TransitionContainer = defineComponent({
  props: {
    transition: { type: String, required: true },
  },
  setup() {
    const show = ref(0);
    return { show };
  },
  mounted() {
    setInterval(() => {
      this.show = (this.show + 1) % 4;
    }, 4000);
  },
});
export default TransitionContainer;
</script>

<style scoped lang="scss">
.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active,
.top-enter-active,
.top-leave-active {
  transition: all 0.5s ease;
}

.left-enter-from {
  transform: translate(+100%);
}

.left-leave-to {
  transform: translate(-100%);
}

.right-enter-from {
  transform: translate(-100%);
}

.right-leave-to {
  transform: translate(+100%);
}

.top-enter-from {
  transform: translateY(-100%);
}

.top-leave-to {
  transform: translateY(+100%);
}
</style>
