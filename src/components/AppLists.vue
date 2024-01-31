<template>
  <v-sheet
    v-if="showLists"
    class="mx-auto mb-6 rounded"
    style="box-shadow: 0px 0px 10px rgba(40, 54, 203, 0.85)">
    <div class="d-flex justify-center">
      <v-card elevation="0">
        <v-card-title class="text-h6 text-md-h5 text-lg-h4">{{
          getTitle(filmType)
        }}</v-card-title>
      </v-card>
    </div>
    <v-slide-group v-model="model" center-active show-arrows>
      <v-slide-group-item
        v-for="(item, index) in items"
        :key="index"
        v-slot="{ isSelected }">
        <v-card
          :color="isSelected ? 'primary' : 'grey-lighten-1'"
          class="ma-4 hover"
          height="300"
          width="200"
          @click="handleMovieId(item.id)">
          <v-img :src="item.poster.url" height="100%" width="100%"></v-img>
          <div class="rating" :style="getRatingStyle(item.rating.kp)">
            {{ item.rating.kp.toFixed(1) }}
          </div>
          <v-card-title class="text-white">{{ item.name }}</v-card-title>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, onMounted, computed, defineProps, toRef } from "vue";
import { getRatingStyle } from "@/helpers/getRatingStyle";
import { getTitle } from "@/helpers/getTitle";
import { capitalize } from "@/helpers/capitalize";

const store = useStore();
const router = useRouter();

const model = ref(0);
const showLists = ref(false);

const props = defineProps(["filmType"]);
const filmType = toRef(props, "filmType");

const handleMovieId = (id) => {
  router.push({ path: `/movies/${id}` });
};
onMounted(() => {
  setTimeout(() => {
    showLists.value = true;
  }, 3000);
});

onMounted(() => {
  if (!items.value || items.value.length === 0) {
    store.dispatch(`${filmType.value}/fetch${capitalize(filmType.value)}`);
  }
});

const items = computed(() => {
  const filmTypeState = store.state[filmType.value];
  if (!filmTypeState) {
    console.error(`State for ${filmType.value} is undefined or null`);
    return [];
  }

  const filmTypeData = filmTypeState[filmType.value];
  if (!filmTypeData) {
    console.error(`Data for ${filmType.value} is undefined or null`);
    return [];
  }
  return filmTypeData;
});
</script>

<style scoped>
.hover:hover {
  box-shadow: 0px 0px 17px rgba(255, 12, 255, 0.988);
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
