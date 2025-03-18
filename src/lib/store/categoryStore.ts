import { create } from 'zustand';
import { Category } from '@/Types';

type State = {
    categories: Category[]
};

type Actions = {
    setCategories: (categories: Category[]) => void,
    addCategory: (category: Category) => void,
    updateCategory: (id: number, data: Category) => void,
    deleteCategory: (index: number) => void
};

const useCategoryStore = create<State & Actions>((set) => ({
    categories: [],
    setCategories: (categories) => set({ categories }),
    addCategory: (category) => set((state) => ({
        categories: [...state.categories, category]
    })),
    updateCategory: (id, data) => set((state) => ({
        categories: state.categories.map((category) => category.id === id ? data : category)
    })),
    deleteCategory: (index) => set((state) => ({
        categories: state.categories.filter((_, i) => i !== index)
    }))
}));

export default useCategoryStore;