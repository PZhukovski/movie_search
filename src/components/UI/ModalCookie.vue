<template>
  <div
    v-if="isActive"
    stacked
    rounded
    dark
    lines="one"
    color="blue-darken-4"
    class="my-4 mx-auto banner pa-6"
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0px 0px 10px rgba(40, 54, 203, 0.85);
      width: 650px;
      height: 150px;
      flex: 0 1 auto;
    ">
    <div>
      <v-avatar
        color="info"
        icon="mdi-information-outline"
        size="36"></v-avatar>
    </div>

    <div style="font-size: 24px; line-height: normal; display: flex">
      Внимание! Это сайт использует куки.
    </div>

    <div>
      <v-btn
        style="display: block; box-shadow: 0px 0px 10px rgba(33, 49, 229, 0.85)"
        rounded="0"
        variant="outlined"
        @click="handleClose">
        Понятно</v-btn
      >
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const isActive = ref(true);

const handleClose = () => {
  isActive.value = false;
};
</script>

<style scoped>
@media (max-width: 900px) {
  .btn,
  .icon {
    align-self: center !important;
  }
  .banner {
    width: auto !important;
    margin: 20px !important;
  }
}
</style>
