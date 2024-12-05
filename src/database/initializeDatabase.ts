import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS expense_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            color TEXT NOT NULL,
            icon TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS income_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            value REAL NOT NULL,
            type TEXT NOT NULL,
            category_id INTEGER NOT NULL,
            FOREIGN KEY (type) REFERENCES income_categories (id),
            FOREIGN KEY (category_id) REFERENCES income_categories (id)
        );
        INSERT INTO categories (name, color, icon) VALUES ('Survival', '#ffe600', 'shopping-cart');
        INSERT INTO categories (name, color, icon) VALUES ('Leisure', '#00ccff', 'coffee');
        INSERT INTO categories (name, color, icon) VALUES ('Culture', '#ff00ff', 'book');
        INSERT INTO categories (name, color, icon) VALUES ('Extra', '#00ff00', 'dollar');
    `)
}