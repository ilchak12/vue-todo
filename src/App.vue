<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { setTodos, useTodoStore } from "@/store/todo";

const todoStore = useTodoStore();

todoStore.getAll();

window.onbeforeunload = function() {
    setTodos(todoStore.todoLists);
}
</script>

<style lang="scss">
@import "src/assets/scss/global";
</style>
