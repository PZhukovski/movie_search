<template>
  <v-row>
    <v-col
      class="flex flex-grow-0"
      v-for="(item, index) in watchability"
      :key="index">
      <a
        class="d-flex flex-column no-decotation"
        target="_blank"
        :href="item.url">
        <v-img
          style="border-radius: 10px"
          class="shadow"
          cover
          aspect-ratio="1/1"
          width="150px"
          :src="item.logo.url">
        </v-img>
        <div style="padding-top: 15px; font-size: 22px">{{ item.name }}</div>
      </a>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script setup>
import { defineProps, toRef } from "vue";

const props = defineProps(["watchability"]);
const watchability = toRef(props, "watchability");
</script>

<style scoped>
.no-decotation,
.no-decotation:active,
.no-decotation:hover {
  text-decoration: none;
  color: #666;
  font-weight: 700;
}
.shadow:hover,
.shadow:active {
  box-shadow: 0px 0px 17px rgba(255, 12, 255, 0.988);
}
</style>
