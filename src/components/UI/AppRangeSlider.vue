<template>
  <v-range-slider
    v-model="value"
    color="indigo"
    color-label="color"
    :min="min"
    :max="max"
    :step="step"
    thumb-label="always"
    @update:modelValue="handleRangeUpdate"></v-range-slider>
</template>
<script setup>
import { ref, defineProps } from "vue";

const props = defineProps(["min", "max", "step", "setRangeValue"]);

const handleRangeUpdate = (validationValue) => {
  props.setRangeValue(validationValue);
};
const value = ref([props.min, props.max]);
</script>

<script>
export default {
  data() {
    return {
      rating: null,
      year: null,
    };
  },
};
</script>
