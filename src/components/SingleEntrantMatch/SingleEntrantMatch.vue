<template>
  <div
    class="flex flex-col justify-between item-center bg-white shadow rounded-lg h-13 relative"
    :class="{
      'flex-row': align === 'left',
      'flex-row-reverse': align === 'right',
      'pulse red': status === MatchStatus.RUNNING,
    }"
  >
    <SpeedDial
      :model="items"
      :key="items.length"
      @click="handleSpeedDialClick"
      v-model:visible="visible"
      :direction="align === 'left' ? 'right' : 'left'"
      :hideOnClickOutside="false"
      class="absolute top-1/2 transform -translate-y-1/2 gap-2 z-1"
      :class="{
        'left-1/3': align === 'left',
        'right-1/3': align === 'right',
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

    <MatchEntrant :align="align" :entrant="entrant" :class="'rounded-l'"></MatchEntrant>
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
            <div class="h-full w-full text-center">
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

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, type Ref, ref, type UnwrapRef, watch } from 'vue'
import type { Entrant } from '@/shared/models/Entrant.ts'
import { MatchStatus } from '@/shared/constants/MatchStatus.ts'
import moment from 'moment'
import MatchEntrant from '@/components/MatchEntrant/MatchEntrant.vue'
import SpeedDial from 'primevue/speeddial'
import { InputNumber } from 'primevue'
import type { MenuItem } from 'primevue/menuitem'

const SingleEntrantMatch = defineComponent({
  components: { MatchEntrant, SpeedDial, InputNumber },
  props: {
    align: { type: String, default: 'left' },
    attempts: { type: Number, default: 1 },
    bestScores: { type: Array as PropType<Array<number>>, default: () => [] },
    entrant: { type: Object as PropType<Entrant>, default: () => ({}), required: true },
    realEndTime: { type: Number, default: () => null },
    realStartTime: { type: Number, default: () => null },
    scheduledEndTime: { type: Number, default: () => null },
    scheduledStartTime: { type: Number, default: () => null },
    scores: {
      type: Array as PropType<Array<Array<number>>>,
      default: () => [],
    },
    scoresCount: { type: Number, default: 1 },
    scoresLabels: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    showScheduledTime: { type: Boolean, default: () => true },
    showScoresLabels: { type: Boolean, default: () => true },
    status: {
      type: String as PropType<MatchStatus>,
      default: () => MatchStatus.SCHEDULED,
    },
  },
  setup(props, { emit }) {
    const fixedScores = computed(() => {
      return Array.from({ length: 1 }, (_, i) =>
        Array.from({ length: props.scoresCount }, (_, j) => props.scores?.[i]?.[j] ?? 0),
      )
    })
    const visible = ref(false)
    const editMode = ref(false)
    const editScores: Ref<UnwrapRef<number[][]>, UnwrapRef<number[][]> | number[][]> = ref(
      structuredClone(fixedScores.value),
    )

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
export default SingleEntrantMatch
</script>

<style scoped></style>
