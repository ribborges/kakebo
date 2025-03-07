import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";

import { PanelContainer } from "@/components/Container";
import { InputText, OptionSelector, Button } from "@/components/Input";
import { useTransactionDatabase } from "@/database/useTransactionDatabase";
import { useCategoriesDatabase } from "@/database/useCategoriesDatabase";
import { Category } from "@/Types";
import { useTransactionStore } from "@/lib/store";

function NewExpense() {
    const [expenseData, setExpenseData] = useState({
        value: '',
        description: '',
        category: ''
    });
    const [categories, setCategories] = useState<Category[]>([]);

    const { addTransaction } = useTransactionStore();
    const transactionDb = useTransactionDatabase();
    const categoryDb = useCategoriesDatabase();

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

            Alert.alert('Success', 'Expense added successfully with ID: ' + res.id);
        } catch (error) {
            if (error instanceof Error) {
                return Alert.alert('Error', error.message);
            }

            return Alert.alert('Error', 'An unknown error occurred');
        } finally {
            setExpenseData({
                value: '',
                description: '',
                category: ''
            });
        }
    };

    const loadCategories = async () => {
        try {
            const categories = await categoryDb.list();
            setCategories(categories);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

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