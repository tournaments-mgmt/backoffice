<template>
  <div class="footer flex flex-col h-16">
    <div class="flex flex-row justify-between align-middle h-full">
      <div>
        <img class="h-full" :src="logoUrl" alt="" />
      </div>
      <div>
        <img class="h-12" :src="flLogoUrl" alt="" />
      </div>
      <div
        class="bar"
        :class="{ connected: connected, disconnected: !connected }"
      ></div>
      <div><SimpleClock /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useShowcaseStore } from "@/stores/showcase";
import { storeToRefs } from "pinia";
import SimpleClock from "@/components/SimpleClock/SimpleClock.vue";

const TheFooter = defineComponent({
  components: { SimpleClock },
  setup() {
    const store = useShowcaseStore();
    const { connected } = storeToRefs(store);
    const logoUrl = new URL(
      "/images/logo/logo_giocomix_16.png",
      import.meta.url
    ).href;

    const flLogoUrl = new URL(
      "/images/logo/logo_flosslab2019.png",
      import.meta.url
    ).href;
    return {
      connected,
      flLogoUrl,
      logoUrl,
    };
  },
});
export default TheFooter;
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.socket-status {
  position: absolute;
}
.bar {
  height: 1px;
  width: 100%;
  left: 0;
  bottom: 0;
}
.connected {
  background: #d0f0dd;
  box-shadow: 0px 0px 0 #40ff22, 0px 0px 4px #30ff1f, 0px 0px 8px #20ff1b,
    0px 0px 16px #10ff18;
  border-radius: 4px;
  position: absolute;
}
.disconnected {
  background: #ff8383;
  box-shadow: 0px 0px 0 #ff2222, 0px 0px 4px #ff1f1f, 0px 0px 8px #ff1b1b,
    0px 0px 16px #ff1010;
  border-radius: 4px;
  position: absolute;
}
</style>
