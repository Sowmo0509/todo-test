import { create } from "zustand";

export const useTodoStore = create((set) => ({
  todo: [],
  addTodo: (newTodo: any) => {
    set((state: any) => ({
      todos: [...state.todos, newTodo],
    }));
  },
  removeTodo: (index: any) => {
    set((state: any) => ({
      todos: state.todos.filter((_: any, i: any) => i !== index),
    }));
  },
}));
