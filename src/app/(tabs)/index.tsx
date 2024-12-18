import React from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import Balance from '@/components/Balance';
import { Categories, TransactionHistory } from '@/components/Categories';

export default function MainPage() {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    // Dummy data for demonstration
    const financialData = {
        income: 5000,
        expenses: 4000,
        savings: 500,
    };

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.scrollView}>
            <Balance income={financialData.income} expenses={financialData.expenses} savings={financialData.savings} />
            <Categories refresh={refreshing} />
            <TransactionHistory refresh={refreshing} />
            <View style={styles.spacer} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,

    },
    spacer: {
        height: 80
    }
});