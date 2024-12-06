import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS expense_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            color TEXT NOT NULL,
            icon TEXT NOT NULL
        );

        INSERT INTO expense_categories (name, color, icon) VALUES ('Survival', '#ffe600', 'shopping-cart');
        INSERT INTO expense_categories (name, color, icon) VALUES ('Leisure', '#00ccff', 'coffee');
        INSERT INTO expense_categories (name, color, icon) VALUES ('Culture', '#ff00ff', 'book');
        INSERT INTO expense_categories (name, color, icon) VALUES ('Extra', '#00ff00', 'dollar');

        CREATE TABLE IF NOT EXISTS income_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL
        );

        INSERT INTO income_categories (category) VALUES ('Income');
        INSERT INTO income_categories (category) VALUES ('Expense');
        INSERT INTO income_categories (category) VALUES ('Saving');

        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            value REAL NOT NULL,
            description TEXT NOT NULL,
            type INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            FOREIGN KEY (type) REFERENCES income_categories (id),
            FOREIGN KEY (category_id) REFERENCES expense_categories (id)
        );
    `)
}