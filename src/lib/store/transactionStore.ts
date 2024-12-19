import { create } from 'zustand';
import { Transaction } from '@/Types';

type State = {
    transactions: Transaction[]
}

type Actions = {
    setTransactions: (transactions: Transaction[]) => void,
    addTransaction: (transaction: Transaction) => void,
    updateTransaction: (id: number, value: number, date: string, description: string) => void,
    deleteTransaction: (index: number) => void
}

const useTransactionStore = create<State & Actions>()((set) => ({
    transactions: [],
    setTransactions: (transactions) => set({ transactions }),
    addTransaction: (transaction) => set((state) => ({
        transactions: [...state.transactions, transaction]
    })),
    updateTransaction: (id, value, date, description) => set((state) => ({
        transactions: state.transactions.map((transaction, i) => i === id ? { ...transaction, value, date, description } : transaction)
    })),
    deleteTransaction: (index) => set((state) => ({
        transactions: state.transactions.filter((_, i) => i !== index)
    }))
}));

export default useTransactionStore;