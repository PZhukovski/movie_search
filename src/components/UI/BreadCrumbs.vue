<template>
  <v-row
    class="bread_crumbs"
    style="
      display: flex;
      justify-content: space-between;
      margin: 20px;
      flex-grow: 0;
    ">
    <back-button />
    <v-btn
      class="mt-6 mx-6 mb-2"
      style="display: block; box-shadow: 0px 0px 10px rgba(33, 49, 229, 0.85)"
      size="large"
      @click="toggleTheme"
      >Сменить тему</v-btn
    >
  </v-row>
</template>
<script setup>
import BackButton from "@/components/UI/BackButton.vue";
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<style scoped>
@media (max-width: 600px) {
  .bread_crumbs {
    margin: 20px 0 !important;
    justify-content: center !important;
  }
}
</style>
