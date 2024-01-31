<template>
  <v-container fluid class="indigo-darken-4">
    <v-row no-gutters>
      <v-col>
        <v-sheet class="ma-2 pa-2 indigo-darken-4">
          Рейтинг
          <app-range
            :min="1"
            :max="10"
            :step="0.5"
            :setRangeValue="setRating"></app-range>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="ma-2 pa-2 indigo-darken-4">
          Год
          <app-range
            :min="1900"
            :max="2023"
            :step="1"
            :setRangeValue="setYear"></app-range>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="ma-2 pa-2 indigo-darken-4">
          Жанр
          <app-autocomplete
            :label="labelGenres"
            :items="genres"
            :setAutocompleteValue="setGenre"></app-autocomplete>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="ma-2 pa-2 indigo-darken-4">
          Страна
          <app-autocomplete
            :label="labelCountry"
            :items="countries"
            :setAutocompleteValue="setCountry"></app-autocomplete>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="ma-2 pa-2 indigo-darken-4">
          <app-radio :setRadioValue="setType"></app-radio>
        </v-sheet>
      </v-col>
    </v-row>
    <v-btn
      style="box-shadow: 0px 0px 10px rgba(33, 49, 229, 0.85)"
      class="ma-4"
      @click="findMovies">
      Поиск
    </v-btn>
  </v-container>
</template>

<script setup>
import AppRange from "@/components/UI/AppRangeSlider.vue";
import AppAutocomplete from "@/components/UI/AppAutocomplete.vue";
import AppRadio from "@/components/UI/AppRadio.vue";
import { genres } from "@/helpers/genres";
import { countries } from "@/helpers/countries";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const labelGenres = "Выберите жанр";
const labelCountry = "Выберите страну";

const setGenre = (genre) => {
  store.commit("filterMovie/setGenre", genre);
};
const setCountry = (country) => {
  store.commit("filterMovie/setCountry", country);
};
const setRating = (rating) => {
  store.commit("filterMovie/setRating", rating);
};
const setYear = (year) => {
  store.commit("filterMovie/setYear", year);
};
const setType = (type) => {
  store.commit("filterMovie/setType", type);
};
async function findMovies() {
  await store.dispatch("filterMovie/fetchMovies");
  router.push({ path: "/search" });
}
</script>

<style scoped>
.indigo-darken-4 {
  border: 1px solid #1a237e;
}
</style>
