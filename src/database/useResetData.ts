import { useSQLiteContext } from "expo-sqlite";
import { dbSchema } from "./db";

export function useResetData() {
    const db = useSQLiteContext();
    
    async function deleteDatabase() {
        try {
            await db.execAsync(`DROP TABLE IF EXISTS transaction_categories`);
            await db.execAsync(`DROP TABLE IF EXISTS expense_categories`);
            await db.execAsync(`DROP TABLE IF EXISTS transactions`);
            await db.execAsync(dbSchema);

            return (`Database has been reset`);
        } catch (error) {
            console.error(error);
        }
    }

    return { deleteDatabase };
}