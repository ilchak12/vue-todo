<template>
	<div class="main-section">
		<div class="main-section__header">
			<input class="main-section__input-title" v-if="isEditable && title" type="text" v-model="title">
			<h2 class="main-section__title" v-else-if="!isEditable && todo?.title">{{ todo.title }}</h2>

			<div class="main-section__actions">
				<v-btn v-if="isEditable" @click="saveList" color="green" variant="flat" icon="mdi-check"></v-btn>
				<v-btn :disabled="isEditable" @click="createTodoOpened = true" color="green" variant="flat" icon="mdi-plus"></v-btn>
				<v-btn @click="toggleEdit" color="blue" variant="flat" icon="mdi-note-edit"></v-btn>
				<v-btn :disabled="isEditable" @click="confirmModalOpened = true" color="red" variant="flat" icon="mdi-delete"></v-btn>
			</div>
		</div>

		<div class="main-section__content">
			<v-row v-if="!todo?.todos?.length">
				<v-col cols="12">
					<h2>You have no todos yet!</h2>
				</v-col>
			</v-row>

			<div class="main-section__todolist">
				<TheTodo
					v-for="(todoItem, i) in todo?.todos"
					:key="i"
					:todo-item="todoItem"
					:list-id="todo?.id"
				/>
			</div>
		</div>
	</div>

	<ConfirmationModal
		v-model="confirmModalOpened"
		message="Are you sure you want to delete this list?"
		:confirm-action="deleteList"
		:cancel-action="closeConfirmModal"
	/>

	<CreateTodoModal
		v-model="createTodoOpened"
		@closeModal="createTodoOpened = false"
		:list-id="todo?.id"
	/>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/store/todo";
import { ITodoList } from "@/interfaces/todo.interface";
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import router from "@/router";
import TheTodo from "@/components/Todos/TheTodo.vue";
import ConfirmationModal from "@/components/Modal/ConfirmationModal.vue";
import CreateTodoModal from "@/components/Modal/CreateTodoModal.vue";

const todoStore = useTodoStore();
const route = useRoute();

const id = computed(() => route.params.id);
let todo = ref(null);

const confirmModalOpened = ref(false);
const createTodoOpened = ref(false);
const isEditable = ref(false);

todo = getTodo(route.params.id);
let title = ref(todo?.title);
watch(() => route.params.id,
	newId => {
		todo = getTodo(newId);
		title = todo?.title;
	}
)

if (!todo) {
	router.push('/')
}

const toggleEdit = () => {
	isEditable.value = !isEditable.value;
	title = todo?.title;
}

const closeConfirmModal = () => {
	confirmModalOpened.value = false;
}

const deleteList = () => {
	router.push('/');
	todoStore.deleteTodoList(todo.id);
	closeConfirmModal();
}

const saveList = () => {
	todoStore.updateTodoList(todo.id, { ...todo, title });
	isEditable.value = false;
	todo.title = title;
}

function getTodo(id) {
	return todoStore.todoLists.find((list: ITodoList) => list.id == id);
}
</script>

<style scoped lang="scss">
.main-section {
	width: 100%;
	max-width: 100%;
	padding: 25px;

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__input-title {
		font-size: 24px;
		outline: none;
		border-bottom: 2px solid #ffffff;
		width: 100%;
		margin-right: 10px;
		font-weight: 700;
		line-height: 120%;
	}

	&__title {
		line-height: 120%;
	}

	&__actions {
		display: flex;
		gap: 10px;
	}

	&__content {
		margin-top: 45px;
	}

	&__todolist {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 15px;
	}
}

@media only screen and (max-width: 768px) {
	.main-section {
		&__actions {
			position: fixed;
			bottom: 15px;
			right: 15px;
		}
	}
}
</style>
