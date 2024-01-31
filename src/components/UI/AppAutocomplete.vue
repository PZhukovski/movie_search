<template>
  <v-autocomplete
    :label="label"
    :items="items"
    item-title="name"
    clearable
    :model-value="autocompleteValue"
    @update:modelValue="handleAutocompleteUpdate"></v-autocomplete>
  <ModalAdult
    :isDialogOpen="modalIsOpen"
    @confirm="handleConfirm"
    @update:isDialogOpen="(value) => (modalIsOpen = value)" />
</template>

<script setup>
import ModalAdult from "@/components/UI/ModalAdult.vue";
import { ref, defineProps, onMounted } from "vue";

const props = defineProps(["items", "label", "setAutocompleteValue"]);
const modalIsOpen = ref(false);
const autocompleteValue = ref(null);

const handleAutocompleteUpdate = (validationValue) => {
  if (validationValue === "для взрослых") {
    props.setAutocompleteValue(validationValue);
    autocompleteValue.value = validationValue;
    modalIsOpen.value = true;
  } else {
    autocompleteValue.value = validationValue;
    props.setAutocompleteValue(validationValue);
  }
};
const handleConfirm = (answer) => {
  if (answer === "no") {
    autocompleteValue.value = null;
    props.setAutocompleteValue(null);
  }
};

onMounted(() => {
  if (!props.items) {
    console.warn("items is not defined");
  }
});
</script>
