<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3" xxl="3">
        <v-btn
          v-if="!isScreenSizeLarge"
          @click="handleSidebar"
          size="large"
          class="mb-4"
          style="box-shadow: 0px 0px 10px rgba(33, 49, 229, 0.85)">
          <v-icon color="indigo" size="large" class="mr-2"
            >mdi-arrow-down-bold-circle</v-icon
          >
          <span> Поиск </span>
        </v-btn>

        <app-sidebar v-if="isScreenSizeLarge || isOpen"></app-sidebar>
      </v-col>
      <v-col cols="12" sm="12" md="9" lg="9" xl="9">
        <v-sheet class="px-2">
          <app-container></app-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import AppSidebar from "@/components/UI/AppSidebar.vue";
import AppContainer from "@/components/AppContainer.vue";
import { onMounted, ref } from "vue";

const isOpen = ref(false);
const isScreenSizeLarge = ref(true);

const handleSidebar = () => {
  isOpen.value = !isOpen.value;
};
onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

const checkScreenSize = () => {
  isScreenSizeLarge.value = window.innerWidth >= 960;
};
</script>
<style></style>
