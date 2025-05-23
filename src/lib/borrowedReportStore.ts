import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BorrowedItem = {
  id: string;
  title: string;
  borrower: string;
  phone: string;
  date: string;
};


type State = {
  items: BorrowedItem[];
  addItem: (item: BorrowedItem) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
};

export const useBorrowedReportStore = create<State>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items.filter((i) => i.id !== item.id), item],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      clearItems: () => set({ items: [] }),
    }),
    {
      name: 'borrowed-report-storage', // key in localStorage
    }
  )
);
