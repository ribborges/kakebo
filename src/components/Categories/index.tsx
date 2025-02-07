import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Container, PanelContainer } from '@/components/Container';
import { useCategoryStore, useTransactionStore } from '@/lib/store';

interface ExpenseCategoryProps {
    title: string;
    icon: string;
    amount: number;
    iconColor?: string;
}

function Categories() {
    const { categories } = useCategoryStore();
    const { transactions } = useTransactionStore();

    return (
        <PanelContainer title="Expense Categories">
            <View className="gap-8 pt-2">
                {
                    categories.map((expense, index) => (
                        <Expense
                            key={index}
                            title={expense.name}
                            icon={expense.icon}
                            iconColor={expense.color}
                            amount={
                                transactions
                                    .filter((transaction) => transaction.category_id === expense.id)
                                    .reduce((acc, curr) => acc + curr.value, 0)
                            }
                        />
                    ))
                }
            </View>
        </PanelContainer>
    );
}

function TransactionHistory() {
    const { transactions } = useTransactionStore();

    if (transactions.length > 0) {
        return (
            <Container title="Transaction History">
                <View className="gap-8 pt-2">
                    {
                        transactions.map((transaction, index) => (
                            <Expense
                                key={index}
                                title={transaction.description}
                                icon={"dollar"}
                                amount={transaction.value}
                                iconColor={
                                    transaction.transaction_type === 1
                                        ? "#22c55e"
                                        : transaction.transaction_type === 2
                                            ? "#ef4444"
                                            : transaction.transaction_type === 3
                                                ? "#eab308"
                                                : "#3b82f6"
                                }
                            />
                        ))
                    }
                </View>
            </Container>
        );
    } else { return null; }
}

function Expense({ title, icon, iconColor, amount }: ExpenseCategoryProps) {
    return (
        <View className="flex-row items-center gap-4">
            <View className="h-12 w-12 items-center justify-center">
                <FontAwesome name={icon as any} size={24} color={iconColor || "#854d0e"} />
            </View>
            <View className="flex-1 gap-1">
                <Text className="text-base font-black text-black dark:text-white">{title}</Text>
                <Text className="text-sm text-zinc-700 dark:text-zinc-300">${amount}</Text>
            </View>
        </View>
    );
}

export { Categories, TransactionHistory };