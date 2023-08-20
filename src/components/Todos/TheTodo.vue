<template>
	<div class="todo" v-if="todoItem">
		<label class="todo__checkbox">
			<input type="checkbox" :checked="todoItem.isCompleted" @change="isCompleted">
			<v-icon>mdi-check</v-icon>
			<input v-if="isEditable" type="text" v-model="title">
			<span v-else>{{ todoItem.title }}</span>
		</label>

		<div class="todo__actions">
			<div class="todo__save" v-if="isEditable" title="Save" @click="saveNote">
				<v-btn color="green" variant="flat" icon="mdi-check" size="x-small"></v-btn>
			</div>
			<div class="todo__edit" @click="toggleEdit" title="Edit">
				<v-btn color="blue" variant="flat" icon="mdi-note-edit" size="x-small"></v-btn>
			</div>
			<div class="todo__remove" @click="toggleModal = true" title="Delete">
				<v-btn color="red" variant="flat" icon="mdi-delete" size="x-small"></v-btn>
			</div>
		</div>
	</div>

	<ConfirmationModal
		v-model="toggleModal"
		message="Are you sure you want to delete this note?"
		:confirm-action="deleteNote"
		:cancel-action="closeModal"
	/>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/store/todo";
import { ref } from "vue";
import ConfirmationModal from "@/components/Modal/ConfirmationModal.vue";

const props = defineProps([
	"todoItem",
	"listId",
])
const todoStore = useTodoStore();
const toggleModal = ref(false);
const isEditable = ref(false);

let title = ref(props.todoItem.title);

const isCompleted = () => {
	todoStore.changeIsComplete(props.listId, props.todoItem.title);
}

const toggleEdit = () => {
	isEditable.value = !isEditable.value;
	title = props.todoItem.title;
}

const closeModal = () => {
	toggleModal.value = false;
}

const deleteNote = () => {
	todoStore.deleteTodo(props.listId, props.todoItem.title);
	closeModal();
}

const saveNote = () => {
	todoStore.updateTodo(props.listId, props.todoItem.title, { ...props.todoItem, title});
	isEditable.value = false;
}
</script>

<style scoped lang="scss">
.todo {
	width: 100%;
	max-width: 900px;
	display: grid;
	grid-template-columns: 1fr 80px;
	//display: flex;
	gap: 30px;

	&__checkbox {
		position: relative;
		display: flex;
		gap: 10px;
		flex: 1 0 auto;

		input[type='checkbox'] {
			opacity: 0;
			position: absolute;

			&:checked + i {
				border-color: #4CAF50;
				background-color: #4CAF50;

				&::before {
					opacity: 1;
				}
			}
		}

		i {
			border: 2px solid #ffffff;
			border-radius: 4px;

			&::before {
				opacity: 0;
			}
		}

		input[type="text"],
		span {
			font-size: 18px;
			line-height: 120%;
		}

		span {
			word-break: break-word;
		}
	}

	input[type="text"] {
		border-bottom: 2px solid #ffffff;
		width: 100%;
		outline: none;
	}

	&__actions {
		display: flex;
		gap: 10px;
	}

	&__edit,
	&__remove {
		transition: 0.3s ease-in-out all;
		opacity: 0.3;
	}

	&:hover {
		.todo {
			&__edit,
			&__remove {
				opacity: 1;
			}
		}
	}
}

@media only screen and (max-width: 768px) {
	.todo {
		grid-template-columns: 1fr;

		&__actions {
			justify-self: flex-end;
		}
	}
}
</style>
