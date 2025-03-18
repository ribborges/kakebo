import { useSQLiteContext } from "expo-sqlite";
import { Category } from "@/Types";

export function useCategoriesDatabase() {
    const db = useSQLiteContext();

    async function create(data: Omit<Category, 'id'>) {
        const statement = await db.prepareAsync(
            'INSERT INTO expense_categories (name, icon, color) VALUES ($name, $icon, $color)'
        );

        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $icon: data.icon,
                $color: data.color
            });

            const id = result.lastInsertRowId.toString();

            return { id, ...data };
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function update(id: number, data: Omit<Category, 'id'>) {
        const statement = await db.prepareAsync(
            'UPDATE expense_categories SET name = $name, icon = $icon, color = $color WHERE id = $id'
        );

        try {
            await statement.executeAsync({
                $id: id,
                $name: data.name,
                $icon: data.icon,
                $color: data.color
            });

            return { id, ...data };
        } catch (error) {
            throw error;
        }
    }

    async function list() {
        const query = 'SELECT * FROM expense_categories';

        try {
            const result = await db.getAllAsync<Category>(query);

            return result;
        } catch (error) {
            throw error;
        }
    }

    return { create, update, list };
}