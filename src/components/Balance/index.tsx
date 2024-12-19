import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { PanelContainer } from "@/components/Container";
import { ACCENT_COLORS } from "@/constants/theme";

import { baseStyles, themeStyles } from "./style";
import { useTransactionStore } from "@/lib/store";

export default function Balance() {
    const colorScheme = useColorScheme();
    const { transactions } = useTransactionStore();

    const themedSummary = colorScheme === 'light' ? themeStyles.summaryContainerLight : themeStyles.summaryContainerDark;

    const income = transactions.filter((transaction) => transaction.transaction_type === 1).reduce((acc, curr) => acc + curr.value, 0);
    const expenses = transactions.filter((transaction) => transaction.transaction_type === 2).reduce((acc, curr) => acc + curr.value, 0);
    const savings = transactions.filter((transaction) => transaction.transaction_type === 3).reduce((acc, curr) => acc + curr.value, 0);
    const balance = income - expenses - savings;

    return (
        <PanelContainer title="Balance">
            <Text style={baseStyles.balanceValue}>${balance}</Text>
            <View style={[baseStyles.summaryContainer, themedSummary]}>
                <SummaryItem title="Income" value={income} color={ACCENT_COLORS.success} />
                <SummaryItem title="Expenses" value={expenses} color={ACCENT_COLORS.danger} />
                <SummaryItem title="Savings" value={savings} color={ACCENT_COLORS.warning} />
            </View>
        </PanelContainer>
    );
}

function SummaryItem({ title, value, color }: { title: string, value: number, color?: string }) {
    const colorScheme = useColorScheme();
    const summaryLabel = colorScheme === 'light' ? themeStyles.summaryLabelLight : themeStyles.summaryLabelDark;

    return (
        <View style={baseStyles.summaryItem}>
            <Text style={[baseStyles.summaryLabel, summaryLabel]}>{title}</Text>
            <Text style={StyleSheet.flatten([baseStyles.summaryValue, color ? { color: color } : {}])}>${value}</Text>
        </View>
    );
}