<template>
  <v-card
    class="mt-6 ml-0 ml-md-4 ml-lg-4 ml-xl-4 ml-xxl-4 pb-0 pa-2 rounded"
    v-if="videosAvailable"
  >
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">Трейлер</v-card-title>
    <iframe
      width="100%"
      height="415"
      :src="movieDetails.videos.trailers[0].url"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </v-card>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps(["movieDetails"]);

const videosAvailable = computed(() => {
  return props.movieDetails?.videos?.trailers?.length > 0;
});
</script>
