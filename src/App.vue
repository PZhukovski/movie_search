<template>
  <v-app >
    <app-navbar />
    <bread-crumbs/>
    <v-main>
      <router-view />
    </v-main>
    <modal-cookie />
  </v-app>
</template>

<script setup>
import AppNavbar from "@/components/UI/AppNavbar.vue";
import ModalCookie from "@/components/UI/ModalCookie.vue";
import BreadCrumbs from "@/components/UI/BreadCrumbs.vue";


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

