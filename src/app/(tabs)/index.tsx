import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Balance from '@/components/Balance';
import { Categories, ExpenseHistory } from '@/components/Categories';

export default function MainPage() {
    // Dummy data for demonstration
    const financialData = {
        income: 5000,
        expenses: 4000,
        savings: 500,
    };

    return (
        <ScrollView style={styles.scrollView}>
            <Balance income={financialData.income} expenses={financialData.expenses} savings={financialData.savings} />
            <Categories />
            <ExpenseHistory />
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