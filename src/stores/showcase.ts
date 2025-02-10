import { defineStore } from 'pinia'

import { PaneType } from '@/shared/models/commands/pane/PaneType.ts'
import websocketService from '@/shared/services/websocket.ts'
import type { Command } from '@/shared/models/commands/Command.ts'

export interface ShowCaseState {
  connected: boolean
  type: PaneType
  duration: number
  params: any
}

export const useShowcaseStore = defineStore({
  id: 'showcase',
  state: () =>
    ({
      connected: false,
      type: PaneType.TEXT,
      duration: 10000,
      params: {},
    }) as ShowCaseState,
  actions: {
    async initShowcase() {
      websocketService.onChangeStatus = (connected) => {
        console.info(`WS status change: ${connected}`)
        this.connected = connected
      }

      websocketService.onCommand = (command: Command) => {
        console.debug(command)
        this.type = command.data.type
        this.duration = command.data.duration
        this.params = command.data.params
      }
    },
  },
})
