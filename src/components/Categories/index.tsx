import { View, Text, useColorScheme } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Container, PanelContainer } from '@/components/Container';
import { useCategoryStore, useTransactionStore } from '@/lib/store';
import { ACCENT_COLORS } from '@/constants/theme';

import { baseStyles, themeStyles } from './style';

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
        </PanelContainer>
    );
}

function TransactionHistory() {
    const { transactions } = useTransactionStore();

    if (transactions.length > 0) {
        return (
            <Container title="Transaction History">
                {
                    transactions.map((transaction, index) => (
                        <Expense
                            key={index}
                            title={transaction.description}
                            icon={"dollar"}
                            amount={transaction.value}
                            iconColor={
                                transaction.transaction_type === 1
                                    ? ACCENT_COLORS.success
                                    : transaction.transaction_type === 2
                                        ? ACCENT_COLORS.danger
                                        : transaction.transaction_type === 3
                                            ? ACCENT_COLORS.warning
                                            : ACCENT_COLORS.info
                            }
                        />
                    ))
                }
            </Container>
        );
    } else { return null; }
}

function Expense({ title, icon, iconColor, amount }: ExpenseCategoryProps) {
    const colorScheme = useColorScheme();
    const themedIcon = colorScheme === 'light' ? themeStyles.categoryIconLight : themeStyles.categoryIconDark;
    const themedTitle = colorScheme === 'light' ? themeStyles.categoryTitleLight : themeStyles.categoryTitleDark;
    const themedAmount = colorScheme === 'light' ? themeStyles.categoryAmountLight : themeStyles.categoryAmountDark;

    return (
        <View style={baseStyles.category}>
            <View style={[baseStyles.categoryIcon, themedIcon]}>
                <FontAwesome name={icon as any} size={24} color={iconColor || ACCENT_COLORS.seccondary} />
            </View>
            <View style={baseStyles.categoryDetails}>
                <Text style={[baseStyles.categoryTitle, themedTitle]}>{title}</Text>
                <Text style={[baseStyles.categoryAmount, themedAmount]}>${amount}</Text>
            </View>
        </View>
    );
}

export { Categories, TransactionHistory };