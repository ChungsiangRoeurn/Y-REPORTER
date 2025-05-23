import { create } from 'zustand';

type BorrowedBook = {
  id: string;
  title: string;
  borrower: string;
  phone: string;
  date: string;
};

type State = {
  books: BorrowedBook[];
  addBook: (book: BorrowedBook) => void;
  clearBooks: () => void;
};

type BorrowedBooksStore = {
  books: BorrowedBook[];
  addBook: (book: BorrowedBook) => void;
};

export const useBorrowedBooksStore = create<BorrowedBooksStore>((set) => ({
  books: [],
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
}));

