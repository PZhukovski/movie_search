<template>
  <div class="d-flex align-start flex-column">
    <div style="font-size: 22px; margin-bottom: 10px; font-weight: 700">
      {{ `${title}:` }}
    </div>
    <div style="font-size: 18px; margin-bottom: 25px">
      {{
        persons
          .filter((person) => person.enProfession === profession)
          .map((person) => (person.name ? person.name : person.enName))
          .join(", ")
      }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRef } from "vue";

const props = defineProps(["persons", "title", "profession"]);
const persons = toRef(props, "persons");
const title = toRef(props, "title");
const profession = toRef(props, "profession");
</script>
