import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native';
import Balance from '@/components/Balance';
import { Categories, TransactionHistory } from '@/components/Categories';
import { useCategoryStore, useTransactionStore } from '@/lib/store'
import { useCategoriesDatabase } from '@/database/useCategoriesDatabase';
import { useTransactionDatabase } from '@/database/useTransactionDatabase';

export default function MainPage() {
    const [refreshing, setRefreshing] = React.useState(false);
    const { setCategories } = useCategoryStore();
    const { setTransactions } = useTransactionStore();

    const categoriesDb = useCategoriesDatabase();
    const transactionsDb = useTransactionDatabase();

    const list = async () => {
        try {
            const categories = await categoriesDb.list();
            const transactions = await transactionsDb.list();
            if (categories) setCategories(categories);
            if (transactions) setTransactions(transactions);
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            }

            Alert.alert('Error', 'An unknown error occurred');
        }
    }

    useEffect(() => {
        list();
    }, []);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await list();
        setRefreshing(false);
    }, []);

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.scrollView}>
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