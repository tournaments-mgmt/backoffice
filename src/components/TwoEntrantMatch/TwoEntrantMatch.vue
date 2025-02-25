<template>
  <div
    class="flex justify-between item-center bg-white shadow rounded-lg h-13 relative w-full"
    :class="{
      'pulse red': status === MatchStatus.RUNNING,
    }"
  >
    <SpeedDial
      :model="items"
      :key="items.length"
      @click="handleSpeedDialClick"
      v-model:visible="visible"
      :radius="80"
      type="semi-circle"
      direction="right"
      :hideOnClickOutside="false"
      class="absolute top-1/2 left-1/5 transform -translate-y-1/2 gap-2 z-1"
      :class="{
        'pointer-events-none': !items.length,
      }"
      :show-icon="
        status === MatchStatus.SCHEDULED
          ? 'pi pi-calendar'
          : status === MatchStatus.DRAFT
            ? 'pi pi-pencil'
            : status === MatchStatus.CANCELED
              ? 'pi pi-eraser'
              : status === MatchStatus.COMPLETED
                ? 'pi pi-check'
                : 'pi pi-plus'
      "
      hide-icon="pi pi-times"
      :buttonClass="{
        'status-running': status === MatchStatus.RUNNING,
        'status-completed': status === MatchStatus.COMPLETED,
        'status-scheduled': status === MatchStatus.SCHEDULED,
        'status-draft': status === MatchStatus.DRAFT,
        'status-canceled': editMode || status == MatchStatus.CANCELED,
      }"
    />

    <div class="flex justify-between w-full relative divide-x">
      <div
        v-for="(entrant, index) in entrants.concat(Array(entrantCount - entrants.length).fill({}))"
        :key="index"
        class="flex items-center justify-between box-content border-gray-500 w-full h-full"
        :class="{
          'flex-row': index === 0,
          'flex-row-reverse': index === 1,
        }"
      >
        <MatchEntrant
          :align="index === 0 ? 'left' : 'right'"
          :entrant="entrant"
          class="rounded-lg"
        ></MatchEntrant>
        <div class="h-full flex justify-center items-center divide-x"  :class="{
                'flex-row': index === 0,
                'flex-row-reverse': index === 1,
              }">
          <div
            v-for="(scoreBestOf, scoreBestOfIndex) in fixedScores[index]"
            :key="scoreBestOfIndex"
            class="h-full flex items-center justify-center border-gray-200 min-w-10"
            :class="{
              'best-score': bestScores[scoreBestOfIndex] === index,
              'flex-row': index === 0,
              'flex-row-reverse': index === 1,
            }"
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
                  <div v-if="!editMode">
                    <RadioButton
                      :modelValue="fixedScores[index][scoreBestOfIndex][scoreMatchIndex]"
                      :inputId="`${index}_${scoreBestOfIndex}_${scoreMatchIndex}`"
                      :name="`${scoreBestOfIndex}_${scoreMatchIndex}`"
                      :value="1"
                      class="pointer-events-none"
                    />
                  </div>
                </div>
              </div>
              <div v-if="status === MatchStatus.SCHEDULED">
                <div class="p-1">
                  <div class="w-3 h-3 rounded-full"></div>
                </div>
              </div>
              <div
                v-if="status === MatchStatus.SCHEDULED && showScheduledTime"
                class="flex justify-between items-center p-4 font-bold text-xl"
              >
                <p>
                  {{
                    showScheduledTime && scheduledStartTime ? formatTime(scheduledStartTime) : ''
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType, ref, type Ref, type UnwrapRef, watch } from 'vue'
import type { Entrant } from '@/shared/models/Entrant.ts'
import { MatchStatus } from '@/shared/constants/MatchStatus.ts'
import moment from 'moment'
import MatchEntrant from '@/components/MatchEntrant/MatchEntrant.vue'
import SpeedDial from 'primevue/speeddial'
import { InputNumber, RadioButton } from 'primevue'
import type { MenuItem } from 'primevue/menuitem'

const SingleMatch = defineComponent({
  components: {
    MatchEntrant,
    SpeedDial,
    InputNumber,
    RadioButton,
  },
  emits: ['edit-mode', 'confirm-edit', 'next-status', 'previous-status', 'quick-win'],
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
  },
  setup(props, { emit }) {
    const fixedScores = computed(() => {
      return Array.from({ length: props.entrantCount }, (_, i) =>
        Array.from({ length: props.bestOf }, (_, j) =>
          Array.from({ length: props.scoresCount }, (_, k) => props.scores?.[i]?.[j]?.[k] ?? 0),
        ),
      )
    })

    const visible = ref(false)
    const editMode = ref(false)

    const editScores: Ref<UnwrapRef<number[][][]>, UnwrapRef<number[][][]> | number[][][]> = ref(
      structuredClone(fixedScores.value),
    )

    const toggleValue = (i: number, j: number, k: number) => {
      editScores.value = editScores.value.map((subArray: Array<Array<number>>, index: number) => {
        return subArray.map((innerArray: Array<number>, innerJ: number) =>
          innerArray.map((value: number, innerK: number) =>
            innerJ === j && innerK === k ? (index === i ? 1 : 0) : value,
          ),
        )
      })
    }

    const items: Ref<UnwrapRef<MenuItem[]>> = ref([])

    watch(
      () => props.status,
      async (newValue: MatchStatus) => {
        switch (newValue) {
          case MatchStatus.DRAFT:
          case MatchStatus.SCHEDULED:
            items.value = [
              {
                label: 'Previous Status',
                icon: 'pi-backward',
                command: () => emit('previous-status'),
              },
              { label: 'Next Status', icon: 'pi-forward', command: () => emit('next-status') },
            ]
            break
          case MatchStatus.RUNNING:
            items.value = [
              {
                label: 'Modifica',
                icon: 'pi pi-pencil',
                command: () => {
                  visible.value = true
                  editScores.value = structuredClone(fixedScores.value)
                  editMode.value = true
                },
              },
              {
                label: 'Conferma',
                icon: 'pi pi-check',
                command: () => {
                  emit('confirm-edit', editScores.value)
                  visible.value = false
                  editMode.value = false
                },
              },
              {
                label: 'Previous Status',
                icon: 'pi-backward',
                command: () => emit('previous-status'),
              },
              { label: 'Next Status', icon: 'pi-forward', command: () => emit('next-status') },
              { label: 'QuickWin', icon: 'pi pi-trophy', command: () => emit('quick-win') },
            ]
            break
          case MatchStatus.COMPLETED:
            items.value = []
            break
          case MatchStatus.CANCELED:
            items.value = []
            break
        }
      },
      { immediate: true, deep: true },
    )
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
})
export default SingleMatch
</script>

<style scoped lang="scss">
.entrant-avatar {
  font-size: 24px;
  font-weight: 500;
  color: #fff;
}

.match-item {
  min-height: 64px;
}

.entrant-score {
  min-width: 24px;
}
</style>
