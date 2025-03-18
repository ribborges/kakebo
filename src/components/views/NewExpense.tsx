import { useState } from "react";
import { View, Text } from "react-native";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";

import { PanelContainer } from "@/components/Container";
import { InputText, OptionSelector, Button } from "@/components/Input";
import { useTransactionDatabase } from "@/database/useTransactionDatabase";
import { useCategoryStore, useTransactionStore } from "@/lib/store";
import useModal from "@/hooks/useModal";

function NewExpense() {
    const [expenseData, setExpenseData] = useState({
        value: '',
        description: '',
        category: ''
    });
    
    const { categories } = useCategoryStore();

    const { addTransaction } = useTransactionStore();
    const transactionDb = useTransactionDatabase();

    const { show } = useModal();

    const resultModal = (title: string, message: string) => {
        show({
            title,
            content: (
                <View className="gap-2 px-6 pb-6">
                    <Text className="text-zinc-800 dark:text-zinc-200">{message}</Text>
                </View>
            )
        });
    }

    const onChange = (value: string, name: string) => {
        setExpenseData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSave = async () => {
        try {
            if (expenseData.value === '' || expenseData.description === '' || expenseData.category === '') {
                throw new Error('All fields are required');
            }

            if (isNaN(parseFloat(expenseData.value))) {
                throw new Error('Value must be a number');
            }

            const res = await transactionDb.create({
                value: parseFloat(expenseData.value),
                date: new Date().toISOString(),
                description: expenseData.description,
                transaction_type: 2,
                category_id: parseInt(expenseData.category)
            });
            addTransaction({
                id: Number(res.id),
                value: res.value,
                date: res.date,
                description: res.description,
                transaction_type: res.transaction_type,
                category_id: res.category_id
            });

            resultModal('Success', 'Expense "' + res.description + '" added successfully');
        } catch (error) {
            if (error instanceof Error) {
                resultModal('Error', error.message);
                return;
            }

            resultModal('Error', 'An unknown error occurred');
            return;
        } finally {
            setExpenseData({
                value: '',
                description: '',
                category: ''
            });
        }
    };

    return (
        <PanelContainer className="gap-2">
            <InputText
                id='value'
                name='value'
                value={expenseData.value}
                onChange={onChange}
                icon={<FontAwesome6 name="coins" />}
                label='Value'
                placeholder="00.00"
                keyboardType="number-pad"
            />
            <InputText
                id='description'
                name='description'
                value={expenseData.description}
                onChange={onChange}
                icon={<FontAwesome6 name="file-text" />}
                label='Description'
                placeholder="Electricity bill"
            />
            <OptionSelector
                id="category"
                name="category"
                value={expenseData.category}
                onChange={onChange}
                icon={<FontAwesome6 name="list" />}
                label="Category"
                options={
                    categories.map((category) => ({
                        label: category.name,
                        value: category.id.toString(),
                        children: <FontAwesome name={category.icon as any} size={22} color={category.color} />
                    }))
                }
            />
            <Button label="Save" onPress={() => handleSave()} />
        </PanelContainer>
    );
}

export default NewExpense;