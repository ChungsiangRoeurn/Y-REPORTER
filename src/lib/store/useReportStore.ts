import { create } from 'zustand';

export type BorrowEntry = {
  id: string;
  name: string;
  phone: string;
  date: string;
  book: string;
};

interface ReportStore {
  reports: BorrowEntry[];
  addToReport: (entry: BorrowEntry) => void;
  removeFromReport: (id: string) => void;
  clearReport: () => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  reports: [],
  addToReport: (entry) =>
    set((state) => ({
      reports: [...state.reports.filter(e => e.id !== entry.id), entry],
    })),
  removeFromReport: (id) =>
    set((state) => ({
      reports: state.reports.filter((entry) => entry.id !== id),
    })),
  clearReport: () => set({ reports: [] }),
}));
