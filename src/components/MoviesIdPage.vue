<template>
  <v-container fluid class="pa-sm-6 pa-md-8 pa-lg-10 pa-xl-10 pa-xxl-10 pa-4">
    <v-row no-gutters v-if="movieDetails">
      <v-col cols="12" sm="12" md="5" lg="5" xl="5">
        <movie-poster-info :movieDetails="movieDetails" />
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="7">
        <movie-card :movieDetails="movieDetails" />
        <movie-trailer :movieDetails="movieDetails" />
      </v-col>
      <div
        class="mt-8"
        style="width: 100%"
        v-if="
          movieDetails.watchability.items &&
          movieDetails.watchability.items.length !== 0
        ">
        <div
          class="text-h6 text-md-h5 text-lg-h4 mb-6"
          style="text-align: left">
          Смотреть онлайн:
        </div>
        <online-cinema
          :watchability="movieDetails.watchability.items"></online-cinema>
      </div>

      <div class="persons my-4" style="width: 100%" v-if="seasons.length > 0">
        <div
          class="text-h6 text-md-h5 text-lg-h4 mb-6"
          style="text-align: left">
          Сезоны
        </div>
        <v-sheet>
          <app-slide-group
            :items="seasons"
            type="seasons"
            :movieDetailsPosterUrl="movieDetails.poster.url"
            :handleMovieId="null" />
        </v-sheet>
      </div>

      <div
        class="persons my-4"
        style="width: 100%"
        v-if="movieDetails.similarMovies.length > 0">
        <div
          class="text-h6 text-md-h5 text-lg-h4 mb-6"
          style="text-align: left">
          Рекомендации
        </div>
        <v-sheet>
          <app-slide-group
            :items="movieDetails.similarMovies"
            type="similarMovies"
            :movieDetailsPosterUrl="null"
            :handleMovieId="handleMovieId" />
        </v-sheet>
      </div>

      <div
        class="persons my-4"
        style="width: 100%"
        v-if="movieDetails.persons.length > 0">
        <div
          class="text-h6 text-md-h5 text-lg-h4 mb-6"
          style="text-align: left">
          Актеры и съемочный состав
        </div>
        <v-sheet>
          <app-slide-group
            :items="movieDetails.persons"
            type="persons"
            :movieDetailsPosterUrl="null"
            :handleMovieId="null" />
        </v-sheet>
      </div>

      <div class="mt-8" v-if="movieDetails.persons.length > 0">
        <persons-data
          :persons="movieDetails.persons"
          profession="director"
          title="Режиссер"></persons-data>
        <persons-data
          :persons="movieDetails.persons"
          profession="producer"
          title="Продюссер"></persons-data>
        <persons-data
          :persons="movieDetails.persons"
          profession="writer"
          title="Сценарист"></persons-data>
        <persons-data
          :persons="movieDetails.persons"
          profession="composer"
          title="Композитор"></persons-data>
      </div>
      <div class="mt-8" v-if="movieDetails.facts.length > 0">
        <div
          class="text-h6 text-md-h5 text-lg-h4 mb-6"
          style="text-align: left">
          Немного фактов:
        </div>
        <facts-data :facts="movieDetails.facts"></facts-data>
      </div>
    </v-row>
  </v-container>
</template>
<script setup>
import { useStore } from "vuex";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import PersonsData from "./PersonsData.vue";
import FactsData from "./FactsData.vue";
import OnlineCinema from "./OnlineCinema.vue";
import AppSlideGroup from "@/components/UI/AppSlideGroup.vue";
import MovieCard from "@/components/MovieCard.vue";
import MoviePosterInfo from "@/components/MoviePosterInfo.vue";
import MovieTrailer from "@/components/MovieTrailer.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const movieDetails = ref(null);
const seasons = ref(null);
const movieId = ref(route.params.id);

onMounted(async () => {
  await store.dispatch("idMovie/fetchIdMovie", movieId.value);
  movieDetails.value = store.state.idMovie.idMovie;
  seasons.value = store.state.idMovie.seasons;
});

watch(
  () => route.params.id,
  async (newId) => {
    movieId.value = newId;
    await store.dispatch("idMovie/fetchIdMovie", newId);
    movieDetails.value = store.state.idMovie.idMovie;
    seasons.value = store.state.idMovie.seasons;
  }
);

const handleMovieId = (id) => {
  router.push({ path: `/movies/${id}` });
};
</script>

<style scoped>
@media (max-width: 1280px) {
  .column {
    flex-direction: column;
  }
}
.flex {
  display: flex;
}
</style>
