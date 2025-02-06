import { View, Text } from "react-native";
import clsx from "clsx";

import { PanelContainer } from "@/components/Container";
import { Spacer } from "@/components/Separator";
import { useTransactionStore } from "@/lib/store";

export default function Balance() {
    const { transactions } = useTransactionStore();

    const income = transactions.filter((transaction) => transaction.transaction_type === 1).reduce((acc, curr) => acc + curr.value, 0);
    const expenses = transactions.filter((transaction) => transaction.transaction_type === 2).reduce((acc, curr) => acc + curr.value, 0);
    const savings = transactions.filter((transaction) => transaction.transaction_type === 3).reduce((acc, curr) => acc + curr.value, 0);
    const balance = income - expenses - savings;

    return (
        <PanelContainer className="gap-1" title="Balance">
            <Text className="text-2xl text-center font-bold text-yellow-800">${balance}</Text>
            <Spacer space={15} />
            <View className="flex-row justify-around">
                <SummaryItem title="Income" value={income} valueClassName="text-green-500" />
                <SummaryItem title="Expenses" value={expenses} valueClassName="text-red-500" />
                <SummaryItem title="Savings" value={savings} valueClassName="text-yellow-500" />
            </View>
        </PanelContainer>
    );
}

function SummaryItem({ title, value, valueClassName }: { title: string, value: number, valueClassName?: string }) {
    return (
        <View className="items-center flex-row gap-1">
            <Text className="text-sm text-zinc-700 dark:text-zinc-300">{title}</Text>
            <Text className={clsx(
                "text-sm font-bold",
                valueClassName
            )}>${value}</Text>
        </View>
    );
}