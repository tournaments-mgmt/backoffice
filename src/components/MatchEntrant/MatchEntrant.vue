<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Entrant } from '@/shared/models/Entrant.ts'
import { MatchStatus } from '@/shared/constants/MatchStatus.ts'

const MatchEntrant = defineComponent({
  components: {},
  props: {
    id: { type: Number, required: false },
    entrant: {
      type: Object as PropType<Entrant>,
      default: () => {},
    },
    // scores: {
    //   type: Array as PropType<Array<Array<number>>>,
    //   required: false,
    //   default: () => [],
    // },
    // scoresLabels: {
    //   type: Array as PropType<Array<string>>,
    //   default: () => [],
    // },
    // editMode: { type: Boolean, default: () => false },
    // showScoresLabels: { type: Boolean, default: () => false },
    // scoresCount: { type: Number, default: () => 1 },
    // bestOf: { type: Number, default: () => 1 },
    // scheduledStartTime: { type: Number, default: () => null },
    // scheduledEndTime: { type: Number, default: () => null },
    // showScheduledTime: { type: Boolean, default: () => true },
    // realStartTime: { type: Number, default: () => null },
    // realEndTime: { type: Number, default: () => null },
    // status: {
    //   type: String as PropType<MatchStatus>,
    //   default: () => MatchStatus.SCHEDULED,
    // },
    // scoreBoolean: { type: Boolean, default: () => false },
    // winner: { type: Boolean, default: () => false },
    // bestScores: { type: Array as PropType<Array<number>>, default: () => [] },
    align: { type: String, default: () => 'left' },
  },

  setup() {
    return {
      MatchStatus: MatchStatus,
    }
  },
})

export default MatchEntrant
</script>

<template>
  <div
    class="flex items-center justify-between overflow-x-auto box-content border-gray-200 w-full h-full"
    :class="{
      'flex-row': align === 'left',
      'flex-row-reverse': align === 'right',
    }"
  >
    <div
      class="flex items-center h-full"
      :class="{
        'flex-row': align === 'left',
        'flex-row-reverse': align === 'right',
      }"
    >
      <div
        class="h-full aspect-square flex items-center justify-center"
        :style="{ 'background-color': entrant.color }"
      >
        {{ Array.from(entrant.name)[0] }}
      </div>

      <div>
        <p
          :class="{ 'ml-2': align === 'left', 'mr-2': align === 'right' }"
          class="entrant-name text-gray-700 font-semibold font-sans tracking-wide"
        >
          {{ entrant?.name || '-' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
