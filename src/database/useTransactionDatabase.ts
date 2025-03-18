import { useSQLiteContext } from "expo-sqlite";
import { Transaction } from "@/Types";

export function useTransactionDatabase() {
    const db = useSQLiteContext();

    async function create(data: Omit<Transaction, 'id'>) {
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

    async function detele(id: number) {
        const statement = await db.prepareAsync(
            'DELETE FROM transactions WHERE id=$id'
        );

        try {
            await statement.executeAsync({ $id: id });

            return id;
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function update(id: number, data: Omit<Transaction, 'id'>) {
        const statement = await db.prepareAsync(
            'UPDATE transactions SET value=$value, date=$date, description=$description, transaction_type=$transaction_type, category_id=$category_id WHERE id=$id'
        );

        try {
            await statement.executeAsync({
                $id: id,
                $value: data.value,
                $date: data.date,
                $description: data.description,
                $transaction_type: data.transaction_type,
                $category_id: data.category_id
            });

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
            const result = await db.getAllAsync<Transaction>(query);

            return result;
        } catch (error) {
            throw error;
        }
    }

    return { create, detele, update, list };
}