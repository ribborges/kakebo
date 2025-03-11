import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Container } from '@/components/Container';
import { useCategoryStore, useTransactionStore } from '@/lib/store';
import { useTransactionDatabase } from '@/database/useTransactionDatabase';

interface TransactionProps {
    id: number
    title: string;
    icon?: string;
    amount: number;
    iconColor?: string;
    type?: number;
}

function Transactions() {
    const { transactions } = useTransactionStore();
    const { categories } = useCategoryStore();

    if (transactions.length > 0) {
        return (
            <Container title="Transaction History">
                <View className="gap-8 pt-2">
                    {
                        transactions.map((transaction, index) => (
                            <Transaction
                                key={index}
                                id={transaction.id}
                                title={transaction.description}
                                icon={categories.find((category) => category.id === transaction.category_id)?.icon}
                                amount={transaction.value}
                                iconColor={categories.find((category) => category.id === transaction.category_id)?.color}
                                type={transaction.transaction_type}
                            />
                        ))
                    }
                </View>
            </Container>
        );
    } else { return null; }
}

function Transaction({ id, title, icon, iconColor, amount, type }: TransactionProps) {
    const transactionDb = useTransactionDatabase();
    const { transactions, deleteTransaction } = useTransactionStore();
    
    const handleDelete = async (id: number) => {
        await transactionDb.detele(id);
        deleteTransaction(transactions.findIndex((transaction) => transaction.id === id));
    }

    return (
        <View className="flex-row items-center gap-4">
            <View className="h-12 w-12 items-center justify-center">
                <FontAwesome name={icon as any || "dollar"} size={24} color={iconColor || "#854d0e"} />
            </View>
            <View className="flex-1 gap-1">
                <Text className="text-base font-black text-black dark:text-white">{title}</Text>
                <Text className="text-sm text-zinc-700 dark:text-zinc-300">${amount}</Text>
            </View>
            <View className="flex-row items-center gap-8">
                <FontAwesome
                    name="circle"
                    size={16}
                    color={
                        type === 1
                            ? "#22c55e"
                            : type === 2
                                ? "#ef4444"
                                : type === 3
                                    ? "#eab308"
                                    : "#3b82f6"
                    }
                />
                <TouchableOpacity onPress={() => handleDelete(id)}>
                    <Text className="text-red-500">
                        <FontAwesome name="trash" size={22} />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export { Transactions, Transaction };