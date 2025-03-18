import { View, Text } from "react-native";

import { Container } from "@/components/Container";
import { Filter } from "@/components/Filter";
import { useCategoryStore, useTransactionStore } from "@/lib/store";
import { Transaction } from "@/components/Transactions";
import { FontAwesome } from "@expo/vector-icons";
import DateSelector from "@/components/DateSelector";

export default function FinancialHistory() {
    const { categories } = useCategoryStore();
    const { transactions } = useTransactionStore();

    return (
        <Container>
            <DateSelector />
            <Filter id={"categories"} items={[
                {
                    label: 'All',
                    content: <View className="gap-8 pt-2">
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
                },
                {
                    label: 'Income',
                    content: <View className="gap-8 pt-2">
                        {
                            transactions
                            .filter((transaction) => transaction.transaction_type === 1)
                            .map((transaction, index) => (
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
                },
                {
                    label: 'Expenses',
                    content: <View className="gap-8 pt-2">
                        {
                            transactions
                            .filter((transaction) => transaction.transaction_type === 2)
                            .map((transaction, index) => (
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
                },
                {
                    label: 'Savings',
                    content: <View className="gap-8 pt-2">
                        {
                            transactions
                            .filter((transaction) => transaction.transaction_type === 3)
                            .map((transaction, index) => (
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
                },
                ...categories.map((category, index) => ({
                    icon: <FontAwesome name={category.icon as any} size={16} />,
                    label: category.name,
                    content: <View className="gap-8 pt-2">
                        {
                            transactions
                                .filter((transaction) => transaction.category_id === category.id)
                                .map((transaction, index) => (
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
                }))
            ]} />
        </Container>
    );
}