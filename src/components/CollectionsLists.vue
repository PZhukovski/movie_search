<template>
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
        <v-card class="d-flex flex-column px-0" @click="handleMovieId(item.id)">
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
  </v-container>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted, computed, defineProps, toRef, watch } from "vue";
import { capitalize } from "@/helpers/capitalize";
import { getRatingStyle } from "@/helpers/getRatingStyle";

const props = defineProps(["contentType"]);
const contentType = toRef(props, "contentType");
const store = useStore();
const router = useRouter();

onMounted(() => {
  fetchData();
});

watch(contentType, (newContentType) => {
  fetchData();
});

const fetchData = () => {
  store.dispatch(`${contentType.value}/fetch${capitalize(contentType.value)}`);
};

const items = computed(() => {
  return store.getters[
    `${contentType.value}/get${capitalize(contentType.value)}`
  ];
});

const handleMovieId = (id) => {
  router.push({ path: `/movies/${id}` });
};
</script>

<style scoped>
.indigo-darken-4 {
  border: 1px solid #1a237e;
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
  /* background-color: rgba(221, 203, 188, 0.778) */
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
