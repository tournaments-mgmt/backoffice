<script lang="ts">
import { defineComponent } from 'vue'

import { useShowcaseStore } from '@/stores/showcase'
import { env } from '@/env/environment'
import * as uuid from 'uuid'
import persistenceService from '@/shared/services/persistence.ts'
import browserUtility from '@/shared/utilities/browser.ts'
import { PersistenceKey } from '@/shared/models/PersistenceKey.ts'
import websocketService from '@/shared/services/websocket.ts'

export default defineComponent({
  setup() {
    const store = useShowcaseStore()

    return {
      store,
    }
  },
  mounted() {
    const urlTag = browserUtility.getCurrentUrlTag()
    const storageTag = persistenceService.getItem(PersistenceKey.WS_TAG, '')

    // if (!urlTag && storageTag) {
    //   browserUtility.redirectTag(storageTag)
    // } else if (!urlTag && !storageTag) {
    //   const newTag: string = uuid.v4()
    //   persistenceService.setItem(PersistenceKey.WS_TAG, newTag)
    //   browserUtility.redirectTag(newTag)
    // } else if (urlTag && storageTag && urlTag !== storageTag) {
    //   browserUtility.redirectTag(storageTag)
    // } else if ((urlTag && storageTag && urlTag === storageTag) || (urlTag && !storageTag)) {
    //   this.store.initShowcase()
    //   websocketService.tag = urlTag
    //   websocketService.url = env.showCaseWsUrl
    //   websocketService.start()
    // }
  },
})
</script>

<template>
  <RouterView />
</template>

<style>
@import '@/assets/styles/base.scss';

@font-face {
  font-family: 'Press Start 2P';
  src: local('Press Start 2P'),
    url(../../showcase/src/assets/fonts/Press_Start_2P/PressStart2P-Regular.ttf);
}

@font-face {
  font-family: 'Bangers';
  src: local('Bangers'), url(../../showcase/src/assets/fonts/Bangers/Bangers-Regular.ttf);
}
</style>
