import { View, Text, useColorScheme } from 'react-native';
import { Container, PanelContainer } from '@/components/Container';
import { FontAwesome } from '@expo/vector-icons';
import { ACCENT_COLORS } from '@/constants/theme';

import { baseStyles, themeStyles } from './style';

// Dummy data for demonstration
const financialData = {
    detailedExpenses: [
        {
            title: 'Survival',
            amount: 2000,
            icon: 'shopping-cart',
            iconColor: '#ffe600'
        },
        {
            title: 'Leisure',
            amount: 1000,
            icon: 'coffee',
            iconColor: '#00ccff'
        },
        {
            title: 'Culture',
            amount: 500,
            icon: 'book',
            iconColor: '#ff00ff'
        },
        {
            title: 'Extra',
            amount: 500,
            icon: 'dollar',
            iconColor: '#00ff00'
        }
    ],
    historyExpenses: [
        {
            title: 'Rent',
            amount: 1000,
            icon: 'shopping-cart',
        },
        {
            title: 'Groceries',
            amount: 500,
            icon: 'shopping-cart',
        },
        {
            title: 'Utilities (Gas)',
            amount: 100,
            icon: 'shopping-cart',
        },
        {
            title: 'Utilities (Water)',
            amount: 50,
            icon: 'shopping-cart',
        },
        {
            title: 'Utilities (Electricity)',
            amount: 100,
            icon: 'shopping-cart',
        },
        {
            title: 'Transportation (Gasoline)',
            amount: 200,
            icon: 'shopping-cart',
        },
        {
            title: 'Restaurant (Dinner)',
            amount: 150,
            icon: 'coffee',
        },
        {
            title: 'Weekend Getaway',
            amount: 500,
            icon: 'coffee',
        },
        {
            title: 'Movie Tickets',
            amount: 50,
            icon: 'coffee',
        },
        {
            title: 'Bowling Night',
            amount: 50,
            icon: 'coffee',
        },
        {
            title: 'Streaming (Netflix)',
            amount: 20,
            icon: 'coffee',
        },
        {
            title: 'Shopping (Clothing)',
            amount: 230,
            icon: 'coffee',
        },
        {
            title: 'Museum Entry Fee',
            amount: 30,
            icon: 'book',
        },
        {
            title: 'Art Workshop',
            amount: 100,
            icon: 'book',
        },
        {
            title: 'Book Purchase',
            amount: 50,
            icon: 'book',
        },
        {
            title: 'Online Course Subscription',
            amount: 200,
            icon: 'book',
        },
        {
            title: 'Theater Tickets',
            amount: 120,
            icon: 'book',
        },
        {
            title: 'Birthday Gift',
            amount: 100,
            icon: 'dollar',
        },
        {
            title: 'Emergency Expense',
            amount: 200,
            icon: 'dollar',
        },
        {
            title: 'Repairs (Appliances)',
            amount: 100,
            icon: 'dollar',
        },
        {
            title: 'Donations',
            amount: 50,
            icon: 'dollar',
        },
        {
            title: 'Unexpected Taxi Fare',
            amount: 50,
            icon: 'dollar',
        }
    ]
};

interface ExpenseCategoryProps {
    title: string;
    icon: string;
    amount: number;
    iconColor?: string;
}

function Categories() {
    return (
        <PanelContainer title="Expense Categories">
            {
                financialData.detailedExpenses.map((expense, index) => (
                    <Expense
                        key={index}
                        title={expense.title}
                        icon={expense.icon}
                        iconColor={expense.iconColor}
                        amount={expense.amount}
                    />
                ))
            }
        </PanelContainer>
    );
}

function ExpenseHistory() {
    return (
        <Container title="Expense History">
            {
                financialData.historyExpenses.map((expense, index) => (
                    <Expense
                        key={index}
                        title={expense.title}
                        icon={expense.icon}
                        amount={expense.amount}
                    />
                ))
            }
        </Container>
    );
}

function Expense({ title, icon, iconColor, amount }: ExpenseCategoryProps) {
    const colorScheme = useColorScheme();
    const themedCategory = colorScheme === 'light' ? themeStyles.categoryLight : themeStyles.categoryDark;
    const themedIcon = colorScheme === 'light' ? themeStyles.categoryIconLight : themeStyles.categoryIconDark;
    const themedTitle = colorScheme === 'light' ? themeStyles.categoryTitleLight : themeStyles.categoryTitleDark;
    const themedAmount = colorScheme === 'light' ? themeStyles.categoryAmountLight : themeStyles.categoryAmountDark;

    return (
        <View style={[baseStyles.category, themedCategory]}>
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

export { Categories, ExpenseHistory };