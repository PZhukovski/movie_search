<template>
  <v-card
    class="ml-0 ml-md-4 ml-lg-4 ml-xl-4 ml-xxl-4 pb-0 pa-2 rounded"
    elevation="0">
    <v-card-title
      class="text-h5 text-md-h4 text-lg-h3 pb-4"
      style="white-space: wrap; font-weight: 700; line-height: 4rem">
      {{ movieDetails.name }}</v-card-title
    >
    <v-card-text
      v-if="movieDetails.rating.kp !== null && movieDetails.rating.kp !== 0"
      class="text-h5 text-md-h5 text-lg-h5 py-4"
      style="text-align: left">
      <strong>Рейтинг: </strong
      >{{ movieDetails.rating.kp.toFixed(1) }}</v-card-text
    >
    <v-card-text
      v-if="movieDetails.movieLength !== null"
      class="text-h5 text-md-h5 text-lg-h5 py-4"
      style="text-align: left">
      <strong>Продолжительность: </strong>
      {{ movieDetails.movieLength }} мин.</v-card-text
    >
    <v-card-text
      class="text-h5 text-md-h5 text-lg-h5 py-4"
      style="text-align: left; line-height: 2rem;">
      <strong> Жанр: </strong>
      {{ formattedCharacteristic(movieDetails.genres) }}
    </v-card-text>
    <v-card-text
      class="text-h5 text-md-h5 text-lg-h5 py-4"
      style="text-align: left">
      <strong>Страна: </strong>
      {{ formattedCharacteristic(movieDetails.countries) }}
    </v-card-text>
    <v-card-text
      class="text-h5 text-md-h5 text-lg-h5 py-4"
      style="text-align: left">
      <strong>Год выпуска: </strong>{{ movieDetails.year }}</v-card-text
    >
    <div class="flex column">
      <v-card-text
        class="text-h5 text-md-h5 text-lg-h5 py-4"
        style="text-align: left">
        <strong>Описание: </strong></v-card-text
      ><v-card-text style="text-align: justify; line-height: 2rem;" class="text-h6">{{
        movieDetails.description
      }}</v-card-text>
    </div>
    <v-btn
      v-if="isFavorite(movieDetails.id)"
      class="ma-4"
      style="display: block; box-shadow: 0px 0px 10px rgba(33, 49, 229, 0.85)"
      size="large"
      @click="removeFromFavorites(movieDetails.id)">
      Удалить из избранного
      <v-icon end color="indigo" icon="mdi-heart"></v-icon
    ></v-btn>
    <v-btn
      v-else
      @click="addToFavorites(movieDetails)"
      class="ma-4"
      style="display: block; box-shadow: 0px 0px 10px rgba(33, 49, 229, 0.85)"
      size="large">
      Добавить в избранное
      <v-icon end color="indigo" icon="mdi-heart-outline"></v-icon
    ></v-btn>
  </v-card>
</template>

<script setup>
import { useStore } from "vuex";
import { formattedCharacteristic } from "@/helpers/formattedCharacteristic";

const store = useStore();
const props = defineProps(["movieDetails"]);

function addToFavorites(movie) {
  store.commit("favorites/addToFavorites", movie);
}

function removeFromFavorites(movieId) {
  store.commit("favorites/removeFromFavorites", movieId);
}
function isFavorite(movieId) {
  const favorites = store.getters["favorites/getFavorites"];
  return favorites.some((favMovie) => favMovie.id === movieId);
}
</script>
