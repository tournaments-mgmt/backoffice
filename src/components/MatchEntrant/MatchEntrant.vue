<script lang="ts">
import { computed, defineComponent, type PropType, type Ref, ref, watch, type UnwrapRef } from 'vue'
import type { Entrant } from '@/shared/models/Entrant.ts'
import { MatchStatus } from '@/shared/constants/MatchStatus.ts'
import { InputNumber, RadioButton } from 'primevue'

const MatchEntrant = defineComponent({
  components: {
    InputNumber,
    RadioButton,
  },
  props: {
    id: { type: Number, required: false },
    entrant: { type: Object as PropType<Entrant>, default: () => {} },
    scores: {
      type: Array as PropType<Array<Array<number>>>,
      required: false,
      default: () => [],
    },
    scoresLabels: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    editMode: { type: Boolean, default: () => false },
    showScoresLabels: { type: Boolean, default: () => false },
    scoresCount: { type: Number, default: () => 1 },
    bestOf: { type: Number, default: () => 1 },
    scheduledStartTime: { type: Number, default: () => null },
    scheduledEndTime: { type: Number, default: () => null },
    showScheduledTime: { type: Boolean, default: () => true },
    realStartTime: { type: Number, default: () => null },
    realEndTime: { type: Number, default: () => null },
    status: {
      type: String as PropType<MatchStatus>,
      default: () => MatchStatus.SCHEDULED,
    },
    scoreBoolean: { type: Boolean, default: () => false },
    winner: { type: Boolean, default: () => false },
    bestScores: { type: Array as PropType<Array<number>>, default: () => [] },
    align: { type: String, default: () => 'left' },
  },

  setup(props) {
    const fixedScores = computed({
      get() {
        const tempScores: number[][] = Array(props.bestOf).fill([])
        for (const [internalIndex] of tempScores.entries()) {
          tempScores[internalIndex] = tempScores[internalIndex].concat(
            Array(props.scoresCount - tempScores[internalIndex].length).fill(undefined),
          )
        }
        return tempScores
      },
      set(newValue) {
        fixedScores.value = JSON.parse(JSON.stringify(newValue))
        console.log('fixedScores', fixedScores.value)
      },
    })

    console.log('fixedScores', fixedScores)
    const visible = ref(false)

    const editScores: Ref<UnwrapRef<number[][]>, UnwrapRef<number[][]> | number[][]> = ref([])

    watch(
      () => props.editMode,
      (newValue: boolean) => {
        if (newValue) {
          editScores.value = JSON.parse(JSON.stringify(fixedScores.value))
        } else {
        }
      },
    )

    return {
      MatchStatus: MatchStatus,
      fixedScores,
      visible,
      editScores,
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
    <div class="h-full flex justify-center items-center divide-x">
      <div
        v-for="(scoreBestOf, scoreBestOfIndex) in fixedScores"
        :key="scoreBestOfIndex"
        class="h-full flex flex-row items-center justify-center border-gray-200 min-w-10"
      >
        <div
          v-for="(scoreMatch, scoreMatchIndex) in scoreBestOf"
          :key="scoreMatchIndex"
          class="flex flex-col entrant-score justify-center items-center px-2"
        >
          <p
            v-if="showScoresLabels && scoresLabels.length > 0"
            class="text-gray-700 font-sans tracking-wide"
          >
            {{ scoresLabels[scoreMatchIndex] || '' }}
          </p>
          <div v-if="status === MatchStatus.COMPLETED || status === MatchStatus.RUNNING">
            <div class="h-full w-full text-center" v-if="!scoreBoolean">
              <div v-if="editMode">
                <InputNumber
                  v-model="editScores[scoreBestOfIndex][scoreMatchIndex]"
                  size="small"
                  :inputClass="'w-12 text-center p-0'"
                />
              </div>

              <div v-if="!editMode" class="text-gray-700 font-semibold font-sans tracking-wide">
                {{ scoreMatch === undefined ? '-' : scoreMatch }}
              </div>
            </div>
            <div v-else-if="scoreBoolean" class="p-1">
              <div v-if="editMode">
                <RadioButton
                  :modelValue="editScores[scoreBestOfIndex][scoreMatchIndex]"
                  :inputId="`0_${scoreBestOfIndex}_${scoreMatchIndex}`"
                  :name="`${scoreBestOfIndex}_${scoreMatchIndex}`"
                  :value="1"
                  @change="() => {}"
                />
              </div>
              <div
                v-if="!editMode"
                class="w-3 h-3 rounded-full"
                :class="{
                  'bg-emerald-500': scoreMatch,
                  'bg-transparent': !scoreMatch,
                }"
              ></div>
            </div>
          </div>
          <div v-if="status === MatchStatus.SCHEDULED">
            <div class="p-1">
              <div class="w-3 h-3 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
