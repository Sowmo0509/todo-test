import axios from "axios";
import { create } from "zustand";

export const useTodoStore = create((set) => ({
  todos: [],
  pendingTodos: [],
  completedTodos: [],
  singleTodo: {},
  setTodos: (allTodos: any) => {
    set((state: any) => ({
      todos: allTodos,
      pendingTodos: allTodos.filter(function (e: any) {
        return e.status != true;
      }),
      completedTodos: allTodos.filter(function (e: any) {
        return e.status != false;
      }),
    }));
  },
  getTodo: (allTodos: any, id: number) => {
    set((state: any) => ({
      singleTodo: allTodos.filter(function (e: any) {
        return e.id == id;
      }),
    }));
  },
  addTodo: async (newTodo: any) => {
    set((state: any) => ({
      todos: [...state.todos, newTodo],
      pendingTodos: [...state.pendingTodos, newTodo],
    }));
    const { data } = await axios.post("/api/create", newTodo);
    console.log(data.data);
    set((state: any) => {
      const allTodos = [...state.todos];
      const pendingTodos = [...state.pendingTodos];
      const updatedArray = allTodos.map((obj: any) => (obj.id === undefined ? { ...obj, id: data.data.id } : obj));
      const updatedPendingArray = pendingTodos.map((obj: any) => (obj.id === undefined ? { ...obj, id: data.data.id } : obj));
      console.log(updatedArray);
      return { todos: updatedArray, pendingTodos: updatedPendingArray };
    });
  },
  removeTodo: async (id: any) => {
    set((state: any) => ({
      todos: state.todos.filter(function (e: any) {
        return e.id != id;
      }),
      pendingTodos: state.pendingTodos.filter(function (e: any) {
        return e.id != id;
      }),
      completedTodos: state.completedTodos.filter(function (e: any) {
        return e.id != id;
      }),
    }));
    await axios.delete(`/api/delete/?id=${id}`);
  },
  editTodo: async (id: any, newValue: any) => {
    set((state: any) => {
      const allTodos = [...state.todos];
      const updatedArray = allTodos.map((item) => {
        if (item.id == id) {
          return { ...item, ...newValue }; // Update only the specified fields
        }
        return item;
      });
      return {
        todos: [...updatedArray],
        pendingTodos: updatedArray.filter(function (e: any) {
          return e.status != true;
        }),
        completedTodos: updatedArray.filter(function (e: any) {
          return e.status != false;
        }),
      };
    });
    const { data } = await axios.post(`/api/edit/?id=${id}`, newValue);
    set((state: any) => {
      const allTodos = [...state.todos];
      const pendingTodos = [...state.pendingTodos];
      const updatedArray = allTodos.map((obj: any) => (obj.id === id ? { ...data.data } : obj));
      const updatedPendingArray = pendingTodos.map((obj: any) => (obj.id === id ? { ...data.data } : obj));
      return { todos: updatedArray, pendingTodos: updatedPendingArray };
    });
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
