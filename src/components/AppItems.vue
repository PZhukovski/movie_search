<template>
  <v-container v-if="contentType === 'favorites'">
    <div class="ma-2 pa-6 font-weight-bold text-h6">Сортировать по</div>
    <v-row no-gutters>
      <v-col class="pa-2">
        <app-autocomplete
          label="По рейтингу"
          :items="[
            { name: 'От большего к меньшему', value: 'big' },
            { name: 'От меньшего к большему', value: 'less' },
          ]"
          :setAutocompleteValue="setRating"></app-autocomplete>
      </v-col>
      <v-col class="pa-2">
        <app-autocomplete
          label="По типу"
          :items="[
            { name: 'Фильмы', value: 'movie' },
            { name: 'Сериалы', value: 'tv-series' },
            { name: 'Мультфильмы', value: 'cartoon' },
            { name: 'Анимационные сериалы', value: 'animated-series' },
            { name: 'Аниме', value: 'anime' },
          ]"
          :setAutocompleteValue="setType"></app-autocomplete>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid>
    <transition-group name="movie-list" class="v-row" tag="div" appear>
      <v-col
        v-for="item in items"
        :key="item.id"
        sm="6"
        md="4"
        lg="3"
        xl="3"
        style="flex-basis: auto">
        <v-card
          class="d-flex flex-column px-0 hover"
          @click="handleMovieId(item.id)">
          <v-img
            :src="item.poster.url"
            cover
            height="100%"
            width="100%"></v-img>
          <div class="rating" :style="getRatingStyle(item.rating.kp)">
            {{ item.rating.kp.toFixed(1) }}
          </div>
          <div class="flex-grow-1">
            <div v-if="contentType === 'search'">
              {{ item.additionalInfoForSearch }}
            </div>
            <div v-if="contentType === 'favorites'">
              {{ item.additionalInfoForFavorites }}
            </div>
          </div>
        </v-card>
      </v-col>
    </transition-group>
    <v-btn
      style="box-shadow: 0px 0px 17px rgba(255, 12, 255, 0.988);"
      v-if="contentType === 'search'"
      class="my-8"
      @click="findMoreMovies"
      >Смотреть еще</v-btn
    >
  </v-container>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed, defineProps } from "vue";
import AppAutocomplete from "@/components/UI/AppAutocomplete.vue";
import { getRatingStyle } from "@/helpers/getRatingStyle";

const props = defineProps(["contentType"]);

const store = useStore();
const router = useRouter();
const loading = ref(true);

const items = computed(() => {
  if (props.contentType === "search") {
    return store.state.filterMovie.movies;
  } else if (props.contentType === "favorites") {
    return store.getters["favorites/sortedOfRatingAndType"];
  } else {
    return [];
  }
});
const setRating = (rating) => {
  store.commit("favorites/sortRating", rating);
};
const setType = (type) => {
  store.commit("favorites/sortType", type);
};
async function findMoreMovies() {
  try {
    loading.value = true;
    await store.dispatch("filterMovie/loadMoreMovies");
  } catch (error) {
    console.error("Error loading movies:", error);
  } finally {
    loading.value = false;
  }
}

const handleMovieId = (id) => {
  router.push({ path: `/movies/${id}` });
};
</script>

<style scoped>
.indigo-darken-4 {
  border: 1px solid #1a237e;
}
.hover:hover {
  box-shadow: 0px 0px 17px rgba(255, 12, 255, 0.988);
}
.v-row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin: -12px;
}
.movie-list-enter-active,
.movie-list-leave-active {
  transition: transform 1.2s ease;
}
.movie-list-enter,
.movie-list-leave-to {
  transition: transform 1.2s ease;
}
.movie-list-enter-from,
.movie-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.movie-list-move {
  transition: transform 0.4s ease;
}

.movie-list-item {
  display: inline-block;
  opacity: 0;
}

.rating {
  position: absolute;
  top: 10px;
  color: black;
  z-index: 4;
  font-weight: 600;
  width: 30px;
  height: 23px;
  border-radius: 10%;
  left: 10px;
}
</style>
