<template>
  <div class="d-flex flex-column">
    <div>
      <div class="text-caption">Выберите рейтинг выше 👇 и до 10</div>
      <v-slider
        v-model="slider"
        color="blue"
        color-label="color"
        min="1"
        max="10"
        step="0,1"
        thumb-label="always"></v-slider>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const slider = ref(10);
</script>

<script>
export default {
  data() {
    return {
      slider: 50,
    };
  },
};
</script>
