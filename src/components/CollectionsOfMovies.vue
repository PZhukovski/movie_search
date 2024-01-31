<template>
  <v-container fluid class="indigo-darken-4">
    <v-row>
      <v-col
        v-for="item in items"
        :key="item.id"
        style="display: flex; flex-direction: column">
        <v-card
          :style="{
            'box-shadow':
              isActiveTab === item.id
                ? '0px 0px 10px rgba(39, 208, 45, 1)'
                : '0px 0px 10px rgba(118, 33, 229, 0.85)',
          }"
          @click="handleActiveTab(item.id)"
          height="55"
          style="display: flex; align-items: center"
          ><v-card-title
            class="text-h8 text-md-h8 text-lg-h8"
            style="margin: auto; font-weight: 600"
            >{{ item.name }}</v-card-title
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <collections-lists
          :contentType="getContentType(isActiveTab)"></collections-lists
      ></v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CollectionsLists from "@/components/CollectionsLists.vue";
import { items } from "@/helpers/collectionsTitles";

const router = useRouter();
const isActiveTab = ref(1);

onMounted(() => {
  const activeTab = router.currentRoute.value.query.activeTab;
  if (activeTab) {
    isActiveTab.value = parseInt(activeTab);
  }
});
const handleActiveTab = (id) => {
  isActiveTab.value = id;
  router.push({ query: { activeTab: id } });
};
const getContentType = (id) => {
  const item = items.find((i) => i.id === id);
  return item ? item.type : "";
};
</script>
<style scoped></style>
