<template>
  <v-dialog
    transition="dialog-bottom-transition"
    persistent
    width="600"
  >
    <v-card>
      <v-toolbar
        color="primary"
        :title="type === 'list' ? 'Create Note List' : 'Create Todos'"
      ></v-toolbar>
      <v-card-text>
        <v-container>
					<div class="modal__list" v-if="type === 'list'">
						<h3 class="modal__title">List name</h3>
						<v-row>
							<v-col cols="12">
								<v-text-field
									variant="solo-filled"
									label="List name"
									type="text"
									v-model="todoList.title"
									required
									hide-details
								></v-text-field>
							</v-col>
						</v-row>
					</div>

          <div class="modal__todo">
						<h3 v-if="todoLength" class="modal__title">Add Todos</h3>

						<CreateTodo
							ref="newTodos"
							v-for="(todo, i) in todoLength"
							:key="i"
							:on-add-click="increaseTodoList"
							:show-plus-btn="todo === todoLength"
						/>
		  		</div>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-end modal__bottom">
        <v-btn
          variant="flat"
          color="red"
          @click="closeModal"
          prepend-icon="mdi-cancel"
        >
          Close
        </v-btn>
        <v-btn
          variant="flat"
          color="green"
          @click="saveList"
          prepend-icon="mdi-check-circle"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useTodoStore } from "@/store/todo";
import CreateTodo from "@/components/UI/CreateTodo.vue";

const todoStore = useTodoStore();

const props = defineProps([
  "type",
	"listId"
])
const emit = defineEmits([
    "closeModal"
]);

const newTodos = ref(null);
const todoLength = ref(1);
const todoList = reactive({
    title: '',
    todos: []
})

const closeModal = () => {
  emit("closeModal", false);
  todoList.title = '';
  todoList.todos = [];
  todoLength.value = 1;
}

const saveList = () => {
    const allTodos = newTodos.value;

    for (let i = 0; i < allTodos.length; i++) {
        const todo = allTodos[i].todo;

        if (todo?.title?.trim().length) {
            todoList.todos.push({ ...todo, isCompleted: false });
        }
    }

	if (props.type === 'list') {
		todoStore.addTodoList(todoList);
	} else {
		todoStore.addTodos(props.listId, todoList?.todos);
	}

    closeModal();
}

const increaseTodoList = () => {
    todoLength.value++;
}

</script>

<style scoped lang="scss">
.modal {
  &__title {
    margin-bottom: 10px;

    &:not(:first-of-type) {
      margin-top: 25px;
    }
  }

	&__list {
		margin-bottom: 20px;
	}

  &__bottom {
    padding: 10px 24px;
  }
}
</style>
