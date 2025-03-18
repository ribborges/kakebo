import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { Container } from '@/components/Container';
import { useCategoryStore, useTransactionStore } from '@/lib/store';
import { useTransactionDatabase } from '@/database/useTransactionDatabase';
import { Dropdown } from '@/components/Dropdown';

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
    const router = useRouter();
    
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
            <View className="flex-row items-center gap-2">
                <FontAwesome
                    name="circle"
                    size={12}
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
                <Dropdown align="right" items={[
                    {
                        label: "Edit",
                        icon: <Entypo name="pencil" size={14} />,
                        onClick: () => router.navigate({ pathname: "/edit_transaction", params: { id } })
                    },
                    {
                        label: "Delete",
                        icon: <FontAwesome5 name="trash" size={14} />,
                        onClick: () => handleDelete(id)
                    }
                ]}>
                    <Text className="text-zinc-600 dark:text-zinc-400">
                        <Entypo name="dots-three-vertical" size={20} />
                    </Text>
                </Dropdown>
            </View>
        </View>
    );
}

export { Transactions, Transaction };