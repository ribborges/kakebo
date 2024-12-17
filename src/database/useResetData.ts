import { useSQLiteContext } from "expo-sqlite";
import { dbSchema } from "./db";

export function useResetData() {
    const db = useSQLiteContext();
    
    async function deleteDatabase() {
        const statement = await db.prepareAsync(`DROP TABLE IF EXISTS $table`);
    
        try {
            await statement.executeAsync({ $table: 'expense_categories' });
            await statement.executeAsync({ $table: 'transaction_categories' });
            await statement.executeAsync({ $table: 'transactions' });
            await db.execAsync(dbSchema);

            return (`Database has been reset`);
        } catch (error) {
            console.error(error);
        } finally {
            await statement.finalizeAsync();
            await db.closeAsync();
        }
    }

    return { deleteDatabase };
}