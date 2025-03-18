import { useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome6, FontAwesome } from "@expo/vector-icons";

import { InputText, OptionSelector, Button } from "@/components/Input";
import { Container } from "@/components/Container";
import { useCategoryStore, useTransactionStore } from "@/lib/store";
import { useTransactionDatabase } from "@/database/useTransactionDatabase";
import useModal from "@/hooks/useModal";

export default function EditTransaction() {
    const router = useRouter();

    const { id } = useLocalSearchParams() as unknown as { id: string };
    const { transactions, updateTransaction } = useTransactionStore();
    const { categories } = useCategoryStore();
    const transactionDb = useTransactionDatabase();
    const transaction = transactions.find(transaction => transaction.id === parseInt(id));

    const [transactionData, setTransactionData] = useState({
        type: transaction?.transaction_type.toString() || '',
        value: transaction?.value.toString() || '',
        description: transaction?.description || '',
        category: transaction?.category_id?.toString() || '',
    });

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
        setTransactionData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSave = async () => {
        try {
            if (transactionData.value === '' || transactionData.description === '' || (transactionData.type === '2' && transactionData.category === '')) {
                throw new Error('All fields are required');
            }

            if (isNaN(parseFloat(transactionData.value))) {
                throw new Error('Value must be a number');
            }

            const res = await transactionDb.update(parseInt(id), {
                value: parseFloat(transactionData.value),
                date: transaction?.date || new Date().toISOString(),
                description: transactionData.description,
                transaction_type: parseInt(transactionData.type),
                category_id: transactionData.type === '2' ? parseInt(transactionData.category) : null
            });
            updateTransaction(parseInt(id), {
                id: Number(res.id),
                value: res.value,
                date: res.date,
                description: res.description,
                transaction_type: res.transaction_type,
                category_id: res.category_id
            });

            resultModal('Success', 'Expense "' + res.description + '" updated successfully');
        } catch (error) {
            if (error instanceof Error) {
                resultModal('Error', error.message);
                return;
            }

            resultModal('Error', 'An unknown error occurred');
            return;
        } finally {
            router.dismiss();
        }
    };

    return (
        <Container>
            <OptionSelector
                id="type"
                name="type"
                value={transactionData.type}
                onChange={onChange}
                icon={<FontAwesome6 name="list" />}
                label="Type"
                options={[
                    { label: 'Income', value: '1', children: <FontAwesome name="circle" size={22} color="#22c55e" /> },
                    { label: 'Expense', value: '2', children: <FontAwesome name="circle" size={22} color="#ef4444" /> },
                    { label: 'Saving', value: '3', children: <FontAwesome name="circle" size={22} color="#eab308" /> },
                ]}
            />
            <InputText
                id='value'
                name='value'
                value={transactionData.value}
                onChange={onChange}
                icon={<FontAwesome6 name="coins" />}
                label='Value'
                placeholder="00.00"
                keyboardType="number-pad"
            />
            <InputText
                id='description'
                name='description'
                value={transactionData.description}
                onChange={onChange}
                icon={<FontAwesome6 name="file-text" />}
                label='Description'
                placeholder="Electricity bill"
            />
            {
                transactionData.type === '2' &&
                <OptionSelector
                    id="category"
                    name="category"
                    value={transactionData.category}
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
            }
            <Button label="Save" onPress={() => handleSave()} />
        </Container>
    );
}