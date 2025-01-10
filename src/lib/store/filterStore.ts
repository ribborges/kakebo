import { create } from 'zustand';

type State = {
    dateFilter: { month: number, year: number }
}

type Actions = {
    setDateFilter: (month: number, year: number) => void
}

const useFilterStore = create<State & Actions>((set) => ({
    dateFilter: { month: new Date().getMonth() + 1, year: new Date().getFullYear() },
    setDateFilter: (month: number, year: number) => set({ dateFilter: { month, year } }),
}));

export default useFilterStore;