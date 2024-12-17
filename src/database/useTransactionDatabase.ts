import { useSQLiteContext } from "expo-sqlite";

export type TransactionDatabase = {
    id: number;
    date: string;
    value: number;
    description: string;
    transaction_type: number;
    category_id: number;
}

export function useTransactionDatabase() {
    const db = useSQLiteContext();

    async function create(data: Omit<TransactionDatabase, 'id'>) {
        const statement = await db.prepareAsync(
            'INSERT INTO transactions (value, date, description, transaction_type, category_id ) VALUES ($value, $date, $description, $transaction_type, $category_id)'
        );

        try {
            const result = await statement.executeAsync({
                $value: data.value,
                $date: data.date,
                $description: data.description,
                $transaction_type: data.transaction_type,
                $category_id: data.category_id
            });

            const id = result.lastInsertRowId.toString();

            return { id, ...data };
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function list() {
        const query = 'SELECT * FROM transactions';

        try {
            const result = await db.getAllAsync<TransactionDatabase>(query);

            return result;
        } catch (error) {
            throw error;
        } finally {
            await db.closeAsync();
        }
    }

    return { create, list };
}