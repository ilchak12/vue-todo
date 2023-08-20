<template>
	<v-row class="create-todo" ref="createTodo">
		<div class="create-todo__input">
			<v-text-field
				variant="solo-filled"
				label="Todo name"
				type="text"
				v-model="todo.title"
				hide-details
			></v-text-field>
		</div>

		<div class="create-todo__add" v-if="showPlusBtn">
			<v-btn variant="tonal" icon="mdi-plus" @click="onAddClick"></v-btn>
		</div>
	</v-row>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const props = defineProps([
	"onAddClick",
	"showPlusBtn"
])

const createTodo = ref(null);
const todo = reactive({
	title: ''
})

defineExpose({
	createTodo,
	todo
})
</script>

<style scoped lang="scss">
.create-todo {
	flex-wrap: initial;
	gap: 10px;

	&__input {
		flex: 1 0 auto;
	}

	&__add {
		display: flex;
		align-items: center;
	}
}
</style>
