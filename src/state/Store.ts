import { create } from 'zustand';

type Store = {
    income: {
        value: number,
        date: string,
        description: string
    }[],
    expenses: {
        value: number,
        category: string,
        date: string,
        description: string
    }[],
    savings: {
        value: number,
        date: string
    }[],
    categories: {
        name: string,
        color: string,
        icon: string
    }[],
    addIncome: (value: number, date: string, description: string) => void,
    addExpense: (value: number, category: string, date: string, description: string) => void,
    addSavings: (value: number, date: string) => void,
    addCategory: (name: string, color: string, icon: string) => void
    deleteIncome: (index: number) => void,
    deleteExpense: (index: number) => void,
    deleteSavings: (index: number) => void,
    deleteCategory: (index: number) => void
}

const useStore = create<Store>()((set) => ({
    income: [],
    expenses: [],
    savings: [],
    categories: [],
    addIncome: (value, date, description) => set((state) => ({
        income: [...state.income, { value, date, description }]
    })),
    addExpense: (value, category, date, description) => set((state) => ({
        expenses: [...state.expenses, { value, category, date, description }]
    })),
    addSavings: (value, date) => set((state) => ({
        savings: [...state.savings, { value, date }]
    })),
    addCategory: (name, color, icon) => set((state) => ({
        categories: [...state.categories, { name, color, icon }]
    })),
    deleteIncome: (index) => set((state) => ({
        income: state.income.filter((_, i) => i !== index)
    })),
    deleteExpense: (index) => set((state) => ({
        expenses: state.expenses.filter((_, i) => i !== index)
    })),
    deleteSavings: (index) => set((state) => ({
        savings: state.savings.filter((_, i) => i !== index)
    })),
    deleteCategory: (index) => set((state) => ({
        categories: state.categories.filter((_, i) => i !== index)
    }))
}));

export default useStore;