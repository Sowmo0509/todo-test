import { create } from "zustand";

export const useTodoStore = create((set) => ({
  todos: [],
  pendingTodos: [],
  completedTodos: [],
  setTodos: (allTodos: any) => {
    set((state: any) => ({
      todos: allTodos,
      pendingTodos: state.todos.filter(function (e: any) {
        return e.status != true;
      }),
      completedTodos: state.todos.filter(function (e: any) {
        return e.status != false;
      }),
    }));
  },
  addTodo: (newTodo: any) => {
    set((state: any) => ({
      todos: [...state.todos, newTodo],
    }));
  },
  removeTodo: (id: any) => {
    set((state: any) => ({
      todos: state.todos.filter(function (e: any) {
        return e.id != id;
      }),
    }));
  },
  checkTodo: (id: any, todo: any) => {
    set((state: any) => ({
      pendingTodos: state.pendingTodos.filter(function (e: any) {
        return e.id != id;
      }),
      completedTodos: [...state.completedTodos, todo],
    }));
  },
  uncheckTodo: (id: any, todo: any) => {
    set((state: any) => ({
      completedTodos: state.completedTodos.filter(function (e: any) {
        return e.id != id;
      }),
      pendingTodos: [...state.pendingTodos, todo],
    }));
  },
}));
