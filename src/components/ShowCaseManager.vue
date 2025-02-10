<template>
  <section class="w-full h-screen">
    <div id="image" key="image" v-if="type === PaneType.IMAGE">
      <img
        :src="`data:${params.mimeType};base64,${params.imageData}`"
        alt="Image"
        class="object-cover w-full h-full"
      />
    </div>
    <div id="text" key="text" v-if="type === PaneType.TEXT">
      <TextPane
        :title="params.title"
        :sub-title="params.subTitle"
        :text-message="params.textMessage"
        :background-image="params.backgroundImage"
      ></TextPane>
    </div>
    <div
      id="tournament_classification"
      key="tournament_classification"
      v-if="type === PaneType.TOURNAMENT_CLASSIFICATION"
    >
      <TournamentContainer
        :name="params.name"
        :background-image="params.backgroundImage"
        :platform-image="params.platformImage"
        :game-logo-image="params.gameLogoImage"
      >
        <TournamentClassification
          :name="params.name"
          :entrants="params.entrants"
          :results-labels="params.resultsLabels"
          :items-per-column="params.itemsPerColumn"
          :column-per-view="params.columnPerView"
          :duration="duration"
        ></TournamentClassification>
      </TournamentContainer>
    </div>
    <div
      id="tournament_entrants"
      key="tournament_entrants"
      v-if="type === PaneType.TOURNAMENT_ENTRANTS_LIST"
    >
      <TournamentContainer
        :name="params.name"
        :background-image="params.backgroundImage"
        :platform-image="params.platformImage"
        :game-logo-image="params.gameLogoImage"
      >
        <TournamentEntrantsList
          :name="params.name"
          :entrants="params.entrants"
          :items-per-column="params.itemsPerColumn"
          :column-per-view="params.columnPerView"
          :duration="duration"
        ></TournamentEntrantsList>
      </TournamentContainer>
    </div>
    <div
      id="tournament_single_matches"
      key="tournament_single_matches"
      v-if="type === PaneType.TOURNAMENT_SINGLE_MATCHES"
    >
      <TournamentContainer
        :name="params.name"
        :background-image="params.backgroundImage"
        :platform-image="params.platformImage"
        :game-logo-image="params.gameLogoImage"
      >
        <TournamentSingleMatches
          :name="params.name"
          :matches="params.matches"
          :items-per-column="params.itemsPerColumn"
          :column-per-view="params.columnPerView"
          :show-scheduled-time="params.showScheduledTime"
          :duration="duration"
          :single-entrant="params.singleEntrant"
        ></TournamentSingleMatches>
      </TournamentContainer>
    </div>
    <div
      id="tournament_best_of_matches"
      key="tournament_best_of_matches"
      v-if="type === PaneType.TOURNAMENT_BEST_OF_MATCHES"
    >
      <TournamentContainer
        :name="params.name"
        :background-image="params.backgroundImage"
        :platform-image="params.platformImage"
        :game-logo-image="params.gameLogoImage"
      >
        <TournamentBestOfMatches
          :name="params.name"
          :matches="params.matches"
          :scoreBoolean="params.scoreBoolean"
          :items-per-column="params.itemsPerColumn"
          :column-per-view="params.columnPerView"
          :show-scheduled-time="params.showScheduledTime"
          :duration="duration"
        ></TournamentBestOfMatches>
      </TournamentContainer>
    </div>
    <div
      id="tournament_brackets"
      key="tournament_brackets"
      v-if="type === PaneType.TOURNAMENT_BRACKETS"
    >
      <TournamentContainer
        :name="params.name"
        :background-image="params.backgroundImage"
        :platform-image="params.platformImage"
        :game-logo-image="params.gameLogoImage"
      >
        <TournamentBrackets
          :name="params.name"
          :matches="params.matches"
          :scoreBoolean="params.scoreBoolean"
          :show-scheduled-time="params.showScheduledTime"
          :round="params.round"
        ></TournamentBrackets>
      </TournamentContainer>
    </div>
    <div
      id="tournament_groups"
      key="tournament_groups"
      v-if="type === PaneType.TOURNAMENT_GROUPS"
    >
      <TournamentContainer
        :name="params.name"
        :background-image="params.backgroundImage"
        :platform-image="params.platformImage"
        :game-logo-image="params.gameLogoImage"
      >
        <TournamentGroups
          :name="params.name"
          :groups="params.groups"
          :items-per-column="params.itemsPerColumn"
          :column-per-view="params.columnPerView"
          :results-labels="params.resultsLabels"
          :top="params.top"
          :duration="duration"
        ></TournamentGroups>
      </TournamentContainer>
    </div>
    <div
      id="tournament_groups_matches"
      key="tournament_groups_matches"
      v-if="type === PaneType.TOURNAMENT_GROUPS_AND_MATCHES"
    >
      <TournamentContainer
        :name="params.name"
        :background-image="params.backgroundImage"
        :platform-image="params.platformImage"
        :game-logo-image="params.gameLogoImage"
      >
        <TournamentGroupsAndMatches
          :name="params.name"
          :groups="params.groups"
          :duration="duration"
          :results-labels="params.resultsLabels"
        ></TournamentGroupsAndMatches>
      </TournamentContainer>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useShowcaseStore } from "@/stores/showcase";
import { PaneType } from "@/shared/models/commands/pane/PaneType.ts";
import TournamentClassification from "@/components/TorunamentClassification/TournamentClassification.vue";
import TournamentBrackets from "@/components/TournamentBrackets/TournamentBrackets.vue";
import TournamentBestOfMatches from "@/components/TournamentBestOfMatches/TournamentBestOfMatches.vue";
import TournamentSingleMatches from "@/components/TournamentSingleMatches/TournamentSingleMatches.vue";
import TournamentGroupsAndMatches from "@/components/TournamentGroupsAndMatches/TournamentGroupsAndMatches.vue";
import TournamentGroups from "@/components/TournamentGroups/TournamentGroups.vue";
import TournamentContainer from "@/components/TournamentContainer/TournamentContainer.vue";
import TextPane from "@/components/TextPane/TextPane.vue";
import TournamentEntrantsList from "@/components/TournamentEntrantList/TournamentEntrantsList.vue";

const ShowCaseManager = defineComponent({
  components: {
    TournamentEntrantsList,
    TextPane,
    TournamentContainer,
    TournamentGroupsAndMatches,
    TournamentGroups,
    TournamentBestOfMatches,
    TournamentClassification,
    TournamentSingleMatches,
    TournamentBrackets,
  },
  props: {
    tag: { type: String, required: true },
  },
  setup() {
    const store = useShowcaseStore();
    const { type, duration, params } = storeToRefs(store);
    return {
      params,
      duration,
      type,
      store,
      PaneType: PaneType,
    };
  },
  mounted() {
    this.store.initShowcase();
    console.info(this.tag);
  },
});
export default ShowCaseManager;
</script>

<style scoped></style>
