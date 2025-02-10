 <template>
  <div>
    <div class="time p-2">
      <span class="hours">{{ currentTime.hours }}</span
      >:<span class="minutes">{{ currentTime.minutes }}</span
      >:<span class="seconds">{{ currentTime.seconds }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import moment from "moment";

const getCurrentTime = () => {
  const currentTime = moment();
  const hours = currentTime.format("HH");
  const minutes = currentTime.format("mm");
  const seconds = currentTime.format("ss");
  return {
    hours,
    minutes,
    seconds,
  };
};
const SimpleClock = defineComponent({
  setup() {
    let currentTime = ref(getCurrentTime());
    return {
      currentTime,
    };
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = getCurrentTime();
    },
  },
  mounted() {
    setInterval(() => this.updateCurrentTime(), 1000);
  },
});

export default SimpleClock;
</script>

<style scoped lang="scss">
.time {
  font-family: "Bangers", serif;
  font-size: 2rem;
  color: #ffb300;
  width: 124px;
  text-align: left;
}
.hours {
  color: #0099e3;
}
.minutes {
  color: #ff0e00;
}
.seconds {
  color: #44ab00;
}
</style>
