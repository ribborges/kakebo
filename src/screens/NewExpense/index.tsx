import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button } from "@/components/Button";
import { PanelContainer } from "@/components/Container";
import { TextField, OptionSelector } from "@/components/Input";
import { FontAwesome } from "@expo/vector-icons";
import { useTransactionDatabase } from "@/database/useTransactionDatabase";
import { useCategoriesDatabase } from "@/database/useCategoriesDatabase";
import { Category } from "@/Types";
import { useTransactionStore } from "@/lib/store";

function NewExpense() {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const { addTransaction } = useTransactionStore();

    const handleCategoryChange = (value: string[] | string) => {
        if (Array.isArray(value)) {
            setSelectedCategory(value[0]);
        } else {
            setSelectedCategory(value);
        }
    }

    const transactionDb = useTransactionDatabase();
    const categoryDb = useCategoriesDatabase();

    const handleSave = async () => {
        try {
            if (value === '' || description === '' || selectedCategory === '') {
                throw new Error('All fields are required');
            }

            if (isNaN(parseFloat(value))) {
                throw new Error('Value must be a number');
            }

            const res = await transactionDb.create({
                value: parseFloat(value),
                date: new Date().toISOString(),
                description,
                transaction_type: 2,
                category_id: parseInt(selectedCategory)
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
        <PanelContainer>
            <TextField label="Value" onChangeText={setValue} value={value} keyboardType="number-pad" />
            <TextField label="Description" onChangeText={setDescription} value={description} />
            <OptionSelector label="Category" onChange={handleCategoryChange} onlyOne={true} options={
                categories.map((category) => ({
                    label: category.name,
                    value: category.id.toString(),
                    children: <FontAwesome name={category.icon as any} size={22} color={category.color} />
                }))
            } />
            <Button label="Save" onPress={() => handleSave()} />
        </PanelContainer>
    );
}

export default NewExpense;