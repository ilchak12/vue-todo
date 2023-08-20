<template>
  <v-app>
	  <TheHeader />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import TheHeader from "@/components/Header/TheHeader.vue";
</script>

<style lang="scss" scoped>
</style>
