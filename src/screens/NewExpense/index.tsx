import { useState } from "react";
import { Alert, Text } from "react-native";
import { Button } from "@/components/Button";
import { PanelContainer } from "@/components/Container";
import { TextField, OptionSelector } from "@/components/Input";
import { FontAwesome } from "@expo/vector-icons";
import { useTransactionDatabase } from "@/database/useTransactionDatabase";

function NewIncome() {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (value: string[] | string) => {
        if (Array.isArray(value)) {
            setSelectedCategory(value[0]);
        } else {
            setSelectedCategory(value);
        }
    }

    const transactionDb = useTransactionDatabase();

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

    return (
        <PanelContainer>
            <TextField label="Value" onChangeText={setValue} value={value} keyboardType="number-pad" />
            <TextField label="Description" onChangeText={setDescription} value={description} />
            <OptionSelector onChange={handleCategoryChange} onlyOne={true} options={[
                {
                    label: "Survival",
                    value: "1",
                    children: <FontAwesome name="shopping-cart" size={22} color={"#ffe600"} />
                }, {
                    label: "Leisure",
                    value: "2",
                    children: <FontAwesome name="coffee" size={22} color={"#00ccff"} />
                },
                {
                    label: "Culture",
                    value: "3",
                    children: <FontAwesome name="book" size={22} color={"#ff00ff"} />
                },
                {
                    label: "Extra",
                    value: "4",
                    children: <FontAwesome name="dollar" size={22} color={"#00ff00"} />
                }
            ]} />
            <Button label="Save" onPress={() => handleSave()} />
            <Text style={{ color: "#eee" }}>{selectedCategory}</Text>
        </PanelContainer>
    );
}

export default NewIncome;