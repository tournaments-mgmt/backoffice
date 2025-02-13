<template>
  <div
    class="flex flex-col justify-between item-center bg-white shadow rounded-lg h-26 relative"
    :class="{
      'flex-row': align === 'left',
      'flex-row-reverse': align === 'right',
      'pulse red': status === MatchStatus.RUNNING,
    }"
  >
    <SpeedDial
      :model="items"
      @click="handleSpeedDialClick"
      v-model:visible="visible"
      type="semi-circle"
      :direction="align === 'left' ? 'right' : 'left'"
      :hideOnClickOutside="false"
      :radius="80"
      class="absolute top-1/2 transform -translate-y-1/2 gap-0 z-1"
      :class="{
        'left-1/5': align === 'left',
        'right-1/5': align === 'right',
      }"
      showIcon="pi pi-plus"
      hideIcon="pi pi-times"
      :buttonClass="{
        'p-button-primary': !editMode,
        'p-button-danger': editMode,
      }"
    />
    <div class="flex flex-col divide-y justify-around w-full relative">
      <div
        v-for="(entrant, index) in entrants.concat(Array(entrantCount - entrants.length).fill({}))"
        :key="index"
        class="flex items-center justify-between overflow-x-auto box-content border-gray-200 h-full"
        :class="{
          'flex-row': align === 'left',
          'flex-row-reverse': align === 'right',
          'rounded-t-lg': index === 0,
          'rounded-b-lg': index === entrantCount - 1,
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
            v-for="(scoreBestOf, scoreBestOfIndex) in fixedScores[index]"
            :key="scoreBestOfIndex"
            class="h-full flex flex-row items-center justify-center border-gray-200 min-w-10"
            :class="{ 'best-score': bestScores[scoreBestOfIndex] === index }"
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
                    <!--                    <InputText-->
                    <!--                      v-model="editScores[index][scoreBestOfIndex][scoreMatchIndex]"-->
                    <!--                      allow-empty-->
                    <!--                      :pt:root:class="'w-12 text-center p-0'"-->
                    <!--                    />-->

                    <InputNumber
                      v-model="editScores[index][scoreBestOfIndex][scoreMatchIndex]"
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
                      :modelValue="editScores[index][scoreBestOfIndex][scoreMatchIndex]"
                      :inputId="`${index}_${scoreBestOfIndex}_${scoreMatchIndex}`"
                      :name="`${scoreBestOfIndex}_${scoreMatchIndex}`"
                      :value="1"
                      @change="toggleValue(index, scoreBestOfIndex, scoreMatchIndex)"
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
    </div>
    <div
      v-if="status === MatchStatus.SCHEDULED && showScheduledTime"
      class="flex justify-between items-center p-4 font-bold text-xl"
    >
      <p>
        {{ showScheduledTime && scheduledStartTime ? formatTime(scheduledStartTime) : '' }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType, type Ref, ref, type UnwrapRef } from 'vue'
import type { Entrant } from '@/shared/models/Entrant.ts'
import { MatchStatus } from '@/shared/constants/MatchStatus.ts'
import moment from 'moment/moment'
import { RadioButton, InputNumber } from 'primevue'
import SpeedDial from 'primevue/speeddial'

const BestOfMatch = defineComponent({
  components: {
    InputNumber,
    SpeedDial,
    RadioButton,
  },
  props: {
    id: { type: Number, required: false },
    entrants: { type: Array as PropType<Array<Entrant>>, default: () => [] },
    scores: {
      type: Array as PropType<Array<Array<Array<number>>>>,
      required: false,
      default: () => [],
    },
    scoresLabels: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    showScoresLabels: { type: Boolean, default: () => false },
    scoresCount: { type: Number, default: () => 1 },
    entrantCount: { type: Number, default: () => 2 },
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
    winner: { type: Number, required: false },
    bestScores: { type: Array as PropType<Array<number>>, default: () => [] },
    align: { type: String, default: () => 'left' },
  },
  emits: ['edit-mode', 'confirm-edit', 'next-status', 'previous-status', 'quick-win'],
  setup(props, { emit }) {
    let fixedScores = computed({
      get() {
        const tempScores = props.scores.concat(
          Array(props.entrantCount - props.scores.length).fill([]),
        )
        for (const [index] of tempScores.entries()) {
          tempScores[index] = tempScores[index].concat(
            Array(props.bestOf - tempScores[index].length).fill([]),
          )
          for (const [internalIndex] of tempScores[index].entries()) {
            tempScores[index][internalIndex] = tempScores[index][internalIndex].concat(
              Array(props.scoresCount - tempScores[index][internalIndex].length).fill(undefined),
            )
          }
        }
        return tempScores
      },
      set(newValue) {
        fixedScores.value = JSON.parse(JSON.stringify(newValue))
        console.log('fixedScores', fixedScores.value)
      },
    })

    const visible = ref(false)
    const editMode = ref(false)

    const editScores: Ref<UnwrapRef<number[][][]>, UnwrapRef<number[][][]> | number[][][]> = ref([])

    const toggleValue = (i: number, j: number, k: number) => {
      editScores.value = editScores.value.map((subArray: Array<Array<number>>, index: number) => {
        return subArray.map((innerArray: Array<number>, innerJ: number) =>
          innerArray.map((value: number, innerK: number) =>
            innerJ === j && innerK === k ? (index === i ? 1 : 0) : value,
          ),
        )
      })
    }

    const items = ref([
      {
        label: 'Modifica',
        icon: 'pi pi-pencil',
        command: () => {
          visible.value = true
          editScores.value = JSON.parse(JSON.stringify(fixedScores.value))
          editMode.value = true
        },
      },
      {
        label: 'Conferma',
        icon: 'pi pi-check',
        command: () => {
          console.log(editScores.value)
          emit('confirm-edit', editScores.value)
          visible.value = false
          editMode.value = false
        },
      },
      { label: 'Previous Status', icon: 'pi-backward', command: () => emit('previous-status') },
      { label: 'Next Status', icon: 'pi-forward', command: () => emit('next-status') },
      { label: 'QuickWin', icon: 'pi pi-trophy', command: () => emit('quick-win') },
    ])
    return {
      MatchStatus: MatchStatus,
      fixedScores,
      items,
      visible,
      editMode,
      editScores,
      toggleValue,
    }
  },
  methods: {
    formatTime(time: number) {
      return moment(time).format('HH:mm')
    },
    handleSpeedDialClick() {
      if (this.editMode) {
        this.editMode = false
        this.visible = false
        this.editScores = structuredClone(this.fixedScores)
      }
    },
  },
})
export default BestOfMatch
</script>
<style scoped lang="scss">
.best-score * {
  color: red;
}

.pulse {
  background: black;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: pulse-black 2s infinite;
}

.pulse.red {
  background: rgba(255, 102, 102, 0.5);
  box-shadow: 0 0 0 0 rgba(255, 102, 102, 0.5);
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 102, 102, 0.2);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 102, 102, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 102, 102, 0);
  }
}
</style>
