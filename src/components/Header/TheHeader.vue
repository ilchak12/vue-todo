<template>
  <v-app-bar
    color="primary"
    prominent
	class="header"
  >
    <v-app-bar-nav-icon variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>

  	<v-toolbar-title class="header__title">
		  <router-link to="/">Todos</router-link>
	</v-toolbar-title>

  	<v-btn
		:disabled="!todoStore?.lastActionData?.length"
		color="blue"
		variant="flat"
		icon="mdi-redo"
		title="Redo last action"
		@click="todoStore.redoAction()"
	></v-btn>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    location="left"
  >
    <v-list>
      <v-list-item>
        <v-btn color="secondary" class="w-100" @click="modalIsOpened = true">
          <v-icon>mdi-plus</v-icon>
          <p>Add Note List</p>
        </v-btn>
      </v-list-item>

      <v-list-item :link="true" :to="`/list/${item.id}`"  v-for="item in listItems" :key="item.title">
        <v-list-item-title class="d-flex flex-row menu-item-title">
          <v-icon>mdi-note-text</v-icon>
          <p>{{ item.title }}</p>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <CreateTodoModal @closeModal="modalIsOpened = false" v-model="modalIsOpened" type="list" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "@/store/todo";
import CreateTodoModal from "@/components/Modal/CreateTodoModal.vue";

const todoStore = useTodoStore()
const drawer = ref(false);
const modalIsOpened = ref(false);

const listItems = todoStore.todoLists;
</script>

<style scoped lang="scss">
.header {
	&__title a {
		color: #ffffff;
		text-decoration: none;
		font-size: 20px;
	}
}

.menu-item-title {
  gap: 10px;
}
</style>
