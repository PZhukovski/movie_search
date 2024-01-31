<template>
  <v-container>
    <v-row>
      <v-col>
        <app-lists filmType="films"></app-lists>
        <app-lists filmType="series"></app-lists>
        <app-lists filmType="cartoons"></app-lists>
        <app-lists filmType="anime"></app-lists>
        <app-lists filmType="animatedSeries"></app-lists>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import AppLists from "@/components/AppLists.vue";
import { useStore } from "vuex";
import { onMounted } from "vue";

const store = useStore();

onMounted(() => {
  store.dispatch("favorites/loadFavorites");
});

</script>
<style scoped>
.indigo-darken-4 {
  border: 1px solid #1a237e;
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
</style>
