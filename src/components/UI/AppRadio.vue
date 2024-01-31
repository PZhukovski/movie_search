<template>
  <v-container fluid>
    <p>Выберите тип</p>
    <v-radio-group
      color="indigo"
      column
      v-model="radios"
      style="justify-content: flex-start"
      @update:modelValue="handleRadioUpdate">
      <v-radio label="Фильмы" value="movie"></v-radio>
      <v-radio label="Сериалы" value="tv-series"></v-radio>
      <v-radio label="Мультфильмы" value="cartoon"></v-radio>
      <v-radio
        class="text-left"
        label="Анимационные сериалы"
        value="animated-series"></v-radio>
      <v-radio label="Аниме" value="anime"></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps(["setRadioValue"]);

const handleRadioUpdate = (validationValue) => {
  props.setRadioValue(validationValue);
};

const radios = ref("movie");
</script>

<script>
export default {
  data() {
    return {
      radios: "movie",
    };
  },
};
</script>
<style scoped>
.text-left {
  text-align: left;
}
</style>
