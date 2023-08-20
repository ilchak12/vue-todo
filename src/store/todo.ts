// Utilities
import { defineStore } from 'pinia'
import { ITodo, ITodoList } from "@/interfaces/todo.interface";
import router from "@/router";

export function setTodos(todos: ITodoList[]) {
  const data = JSON.stringify(todos);
  window.localStorage.setItem('todoLists', data);
}

export const useTodoStore = defineStore('todo', {
  state: () => {
    return {
      todoLists: [],
      nextListId: 0,
      lastActionData: [],
      lastActionType: ''
    }
  },
  actions: {
    getAll() {
      const data = JSON.parse(window.localStorage.getItem('todoLists'));
      const lastId = data[data.length - 1]?.id || 0;

      this.todoLists = data;
      this.nextListId = lastId + 1;
    },
    addTodos(listId: number, todos: ITodo[]) {
      const todoList = this.todoLists.find((list: ITodoList) => list.id === listId);
      todoList.todos = todoList.todos.concat(todos);

      this.lastActionData = [{ listId }, ...todos];
      this.lastActionType = 'add';
    },
    addTodoList(list: ITodoList) {
      this.todoLists.push({ id: this.nextListId++, ...list });

      this.lastActionData = [{ id: this.nextListId, ...list }];
      this.lastActionType = 'add';
    },
    deleteTodo(listId: number, title: string) {
      const todoList = this.todoLists.find((list: ITodoList) => list.id === listId);
      const todoIndex = todoList?.todos.findIndex((item: ITodo) => item.title === title);
      const deletedTodo = todoList?.todos.splice(todoIndex, 1);

      this.lastActionData = [{...deletedTodo[0], listId, index: todoIndex}];
      this.lastActionType = 'delete';
    },
    deleteTodoList(id: number) {
      const todoList = this.todoLists.find((item: ITodoList) => item?.id === id);
      const todoListIndex = this.todoLists.findIndex((item: ITodoList) => item?.id === id);
      this.todoLists.splice(todoListIndex, 1);

      this.lastActionData = [{...todoList, index: todoListIndex}];
      this.lastActionType = 'delete';
    },
    updateTodo(listId: number, title: string, todo: ITodo) {
      const todoList = this.todoLists.find((list: ITodoList) => list.id === listId);
      const todoIndex = todoList?.todos.findIndex((item) => item.title === title);
      todoList.todos[todoIndex] = todo;
    },
    updateTodoList(listId: number, todoList: ITodoList) {
      const todoListIndex = this.todoLists.findIndex((list: ITodoList) => list.id === listId);
      this.todoLists[todoListIndex] = todoList;
    },
    changeIsComplete(listId: number, title: string) {
      const todoList = this.todoLists.find((list: ITodoList) => list.id === listId);
      const todo = todoList?.todos.find((item) => item.title === title);
      todo.isCompleted = !todo.isCompleted;
    },
    redoAction() {
      this.lastActionData.map((action) => {
        if (this.lastActionType === 'add') {
          // Delete
          if (typeof action?.id === 'number') {
            this.todoLists.pop();
            router.push('/');
          } else {
            const list = this.todoLists.find((list) => typeof action.listId !== 'number' && list?.id === this.lastActionData[0].listId);
            list?.todos?.pop();
          }
        } else {
          // Add
          if (typeof action?.id === 'number') {
            this.todoLists.splice(action?.index, 0, action);
          } else {
            const list = this.todoLists.find((list) => list?.id === action.listId);
            list?.todos?.splice(action?.index, 0, action);
          }
        }
      })

      this.lastActionType = '';
      this.lastActionData = [];
    }
  }
})
