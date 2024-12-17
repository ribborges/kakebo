import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { Button } from "@/components/Button";
import { PanelContainer } from "@/components/Container";
import { TextField, OptionSelector } from "@/components/Input";
import { FontAwesome } from "@expo/vector-icons";
import { useTransactionDatabase } from "@/database/useTransactionDatabase";
import { CategoryDatabase, useCategoriesDatabase } from "@/database/useCategoriesDatabase";

function NewIncome() {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState<CategoryDatabase[]>([]);

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
                transaction_type: 1,
                category_id: parseInt(selectedCategory)
            });

            Alert.alert('Success', 'Income added successfully with ID: ' + res.id);
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
            console.log(categories);
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

export default NewIncome;