import { create } from "zustand";

export const useTodoStore = create((set) => ({
  todo: [],
  addTodo: (id: any) => set((state: any) => ({ bears: state.bears + 1 })),
  deleteTodo: (id: any) => set({ bears: 0 }),
}));
