<template >
  <v-dialog :modelValue="isDialogOpen" color="blue-darken-4" max-width="500" >
    <v-card class= "pa-4"
    style="
      box-shadow: 0px 0px 10px rgba(242, 15, 15, 0.85);
     " >
      <v-card-title class="headline">Вам есть 18 лет?</v-card-title>
      <v-card-actions  class= "ma-4">
        <v-btn
        rounded="0"
        variant="outlined" color="green-darken-1" @click="handleConfirm('yes')">Да</v-btn>
        <v-btn  color="red-accent-4"
        rounded="0"
        variant="outlined" @click="handleConfirm('no')" >Нет, выберу другую категорию</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref , defineProps, defineEmits} from 'vue';

const props = defineProps(['isDialogOpen']);
const emit = defineEmits(['confirm', 'update:isDialogOpen']);
const isOver18 = ref(null);

const handleConfirm = (answer) => {
  emit('confirm', answer);
  emit('update:isDialogOpen', false);
};

</script>
