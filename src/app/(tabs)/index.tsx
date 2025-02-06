import React, { useEffect } from 'react';
import { ScrollView, RefreshControl, Alert } from 'react-native';

import Balance from '@/components/Balance';
import { Categories, TransactionHistory } from '@/components/Categories';
import { useCategoryStore, useFilterStore, useTransactionStore } from '@/lib/store'
import { useCategoriesDatabase } from '@/database/useCategoriesDatabase';
import { useTransactionDatabase } from '@/database/useTransactionDatabase';
import DateSelector from '@/components/DateSelector';
import { Blanckspace } from '@/components/Separator';

export default function MainPage() {
    const [refreshing, setRefreshing] = React.useState(false);
    const { setCategories } = useCategoryStore();
    const { setTransactions } = useTransactionStore();
    const { dateFilter } = useFilterStore();

    const categoriesDb = useCategoriesDatabase();
    const transactionsDb = useTransactionDatabase();

    const month = dateFilter.month;
    const year = dateFilter.year;

    const list = React.useCallback(async () => {
        try {
            const categories = await categoriesDb.list();
            const transactions = await transactionsDb.list();
            if (categories) setCategories(categories);
            if (transactions) {
                const filteredTransactions = transactions.filter(transaction => {
                    const transactionDate = new Date(transaction.date);

                    return (transactionDate.getMonth() + 1) == month && transactionDate.getFullYear() == year;
                });

                setTransactions(filteredTransactions);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', 'An unknown error occurred');
            }
        }
    }, [categoriesDb, transactionsDb, dateFilter, setCategories, setTransactions]);

    useEffect(() => {
        list();
    }, [dateFilter]);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            await list();
        } finally {
            setRefreshing(false);
        }
    }, [list]);

    return (
        <ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <DateSelector />
            <Balance />
            <Categories />
            <TransactionHistory />
            <Blanckspace space={80} />
        </ScrollView>
    );
}