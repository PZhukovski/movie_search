<template>
  <v-layout
    class="overflow-visible"
    style="height: 56px; display: block; flex: none; position: relative">
    <v-bottom-navigation
      v-model="activeRoute"
      color="indigo"
      style="position: fixed; top: 0">
      <v-btn value="main" @click="navigateTo('/')">
        <v-icon color="indigo">mdi-movie-star-outline</v-icon>
        <span>Главная</span>
      </v-btn>
      <v-btn value="favorites" @click="navigateTo('/favorites')">
        <v-icon color="indigo">mdi-heart</v-icon>
        <span>Избранное</span>
      </v-btn>

      <v-btn value="collections" @click="navigateTo('/collections')">
        <v-icon color="indigo">mdi-movie-outline</v-icon>
        <span>Коллекции</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<script>
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const router = useRouter();
    const activeRoute = ref("main");

    const navigateTo = (path) => {
      router.push(path);
      activeRoute.value = path;
    };

    return { activeRoute, navigateTo };
  },
};
</script>
<style></style>
