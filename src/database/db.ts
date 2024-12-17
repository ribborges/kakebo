import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";

export const dbName = "kakebo.db";

export async function initializeDatabase(database: SQLiteDatabase) {
    try {
        const res = await database.execAsync(dbSchema);
        console.log('Database has been initialized: ', res);
    } catch (error) {
        console.error(error);
    }
}

export const dbSchema = `
    CREATE TABLE IF NOT EXISTS transaction_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL
    );

    INSERT OR IGNORE INTO transaction_categories (id, category) VALUES (1, 'Income');
    INSERT OR IGNORE INTO transaction_categories (id, category) VALUES (2, 'Expense');
    INSERT OR IGNORE INTO transaction_categories (id, category) VALUES (3, 'Saving');

    CREATE TABLE IF NOT EXISTS expense_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        icon TEXT NOT NULL
    );

    INSERT OR IGNORE INTO expense_categories (id, name, color, icon) VALUES (1, 'Survival', '#ffe600', 'shopping-cart');
    INSERT OR IGNORE INTO expense_categories (id, name, color, icon) VALUES (2, 'Leisure', '#00ccff', 'coffee');
    INSERT OR IGNORE INTO expense_categories (id, name, color, icon) VALUES (3, 'Culture', '#ff00ff', 'book');
    INSERT OR IGNORE INTO expense_categories (id, name, color, icon) VALUES (4, 'Extra', '#00ff00', 'dollar');

    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        value REAL NOT NULL,
        description TEXT NOT NULL,
        transaction_type INTEGER NOT NULL,
        category_id INTEGER,
        FOREIGN KEY (transaction_type) REFERENCES transaction_categories (id),
        FOREIGN KEY (category_id) REFERENCES expense_categories (id)
    );
`;