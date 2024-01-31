<template>
  <v-sheet class="mx-auto" width="100%">
    <v-slide-group v-model="model" center-active show-arrows>
      <v-slide-group-item v-for="(item, index) in items" :key="index">
        <v-card class="ma-4" height="350" width="200" style="box-shadow: none" @click="type === 'similarMovies' ? handleMovieId(item.id) : null">
          <v-img
            :src="getTypeImageSrc(item, type, movieDetailsPosterUrl )"
            style="border-radius: 10px; object-fit: none !important"
            height="88%"
            width="100%">
            <template v-slot:error>
      <v-img
        :src="movieDetailsPosterUrl"
      ></v-img>
    </template>
          </v-img>
          <v-card-title class="text-white pb-0" style="font-size: 16px">
            <template v-if="type === 'seasons'">
              Сезон {{ index + 1 }}
            </template>
            <template v-else>
              {{ item.name }}
            </template></v-card-title
          >
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["items", "type", "movieDetailsPosterUrl", "handleMovieId"]);

const model = ref(0);
const getTypeImageSrc = (item, type, movieDetailsPosterUrl) => {
  if (type === 'seasons') {
    return item.poster ? item.poster.url : movieDetailsPosterUrl;
  } else if (type === 'similarMovies'){
    return item.poster.url;
  } else {
    return item.photo;
  }
};
</script>
