<template>
  <div>
    <v-btn
      class="mt-6 mx-6 mb-2"
      style="display: block; box-shadow: 0px 0px 10px rgba(33, 49, 229, 0.85)"
      size="large"
      @click="goBack">
      <v-icon color="indigo">mdi-keyboard-backspace</v-icon>
      <span>Назад</span>
    </v-btn>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
<style scoped>
.flex {
  display: flex;
}
</style>
