import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native';
import Balance from '@/components/Balance';
import { Categories, TransactionHistory } from '@/components/Categories';
import { useCategoryStore, useFilterStore, useTransactionStore } from '@/lib/store'
import { useCategoriesDatabase } from '@/database/useCategoriesDatabase';
import { useTransactionDatabase } from '@/database/useTransactionDatabase';
import DateSelector from '@/components/DateSelector';

export default function MainPage() {
    const [refreshing, setRefreshing] = React.useState(false);
    const { setCategories } = useCategoryStore();
    const { setTransactions } = useTransactionStore();
    const { dateFilter } = useFilterStore();

    const categoriesDb = useCategoriesDatabase();
    const transactionsDb = useTransactionDatabase();

    const list = async () => {
        try {
            const categories = await categoriesDb.list();
            const transactions = await transactionsDb.list();
            if (categories) setCategories(categories);
            if (transactions) {
                const filteredTransactions = transactions.filter(transaction => {
                    const transactionDate = new Date(transaction.date);
                    const month = dateFilter.month;
                    const year = dateFilter.year;

                    return (transactionDate.getMonth() + 1) == month && transactionDate.getFullYear() == year;
                });

                setTransactions(filteredTransactions);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            }

            Alert.alert('Error', 'An unknown error occurred');
        }
    }

    useEffect(() => {
        list();
    }, [dateFilter]);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await list();
        setRefreshing(false);
    }, []);

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.scrollView}>
            <DateSelector />
            <Balance />
            <Categories />
            <TransactionHistory />
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