import { CommandType } from '@/shared/models/commands/CommandType'
import type { NewTagCommandData } from '@/shared/models/commands/new-tag/NewTagCommandData'
import persistenceService from '@/shared/services/persistence.ts'
import { PersistenceKey } from '@/shared/models/PersistenceKey.ts'
import browserUtility from '@/shared/utilities/browser.ts'
import type { Command } from '@/shared/models/commands/Command.ts'

export class CommandService {
  evaluate(command: Command) {
    switch (command.type) {
      case CommandType.FULL_REFRESH:
        this.evaluateFullRefresh()
        break
      case CommandType.NEW_TAG:
        this.evaluateNewTag(command.data as NewTagCommandData)
        break
      case CommandType.PANE:
        return command
    }
  }

  private evaluateFullRefresh() {
    console.info('Full refresh command')

    window.location.reload()
  }

  private evaluateNewTag(data: NewTagCommandData) {
    console.info('New tag command')

    const newTag: string = data.tag
    persistenceService.setItem(PersistenceKey.WS_TAG, newTag)
    browserUtility.redirectTag(newTag)
  }

  static parse(rawData: any): Command {
    if (!rawData?.type) {
      throw new Error()
    }

    return rawData
  }
}

const commandService = new CommandService()

export default commandService
