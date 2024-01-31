<template>
  <v-row class="justify-space-between">
    <v-col
      class="flex pa-6"
      sm="6"
      md="6"
      lg="6"
      xl="4"
      style="flex-basis: auto"
      v-for="(item, index) in facts"
      :key="index + 1">
      <div class="d-flex flex-grow-1">
        <v-card
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 35px;
            font-weight: 700;
            box-shadow: 0px 0px 17px rgba(255, 12, 255, 0.988);
          "
          height="70px"
          width="70px">
          <div>{{ index + 1 }}</div>
        </v-card>
        <div
          style="width: fit-content; padding-left: 15px; text-align: start"
          v-html="removeHtmlTags(item.value)"></div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineProps, toRef } from "vue";
import { removeHtmlTags } from "@/helpers/removeHtmlTags"

const props = defineProps(["facts"]);
const facts = toRef(props, "facts");

</script>
