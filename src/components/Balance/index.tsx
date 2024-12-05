import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { PanelContainer } from "@/components/Container";
import { ACCENT_COLORS } from "@/constants/theme";

import { baseStyles, themeStyles } from "./style";

interface SummaryProps {
    income: number;
    expenses: number;
    savings: number;
}

export default function Balance(props: SummaryProps) {
    const colorScheme = useColorScheme();
    const themedSummary = colorScheme === 'light' ? themeStyles.summaryContainerLight : themeStyles.summaryContainerDark;

    return (
        <PanelContainer title="Balance">
            <Text style={baseStyles.balanceValue}>${props.income - props.expenses - props.savings}</Text>
            <View style={[baseStyles.summaryContainer, themedSummary]}>
                <SummaryItem title="Income" value={props.income} color={ACCENT_COLORS.success} />
                <SummaryItem title="Expenses" value={props.expenses} color={ACCENT_COLORS.danger} />
                <SummaryItem title="Savings" value={props.savings} color={ACCENT_COLORS.warning} />
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