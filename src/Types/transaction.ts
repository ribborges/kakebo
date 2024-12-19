export type Transaction = {
    id: number;
    value: number;
    description: string;
    date: string;
    transaction_type: number;
    category_id: number | null;
}