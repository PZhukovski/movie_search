
<template>
  <v-card class="d-flex flex-column px-0">
    <v-img :src="movieDetails.poster.url" cover height="100%" width="100%"></v-img>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(["movieDetails"]);



</script>
