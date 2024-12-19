import { useState } from "react";
import { Alert, Text } from "react-native";
import { PanelContainer } from "@/components/Container";
import { OptionSelector, TextField } from "@/components/Input";
import { FontAwesome } from "@expo/vector-icons";
import { ACCENT_COLORS } from "@/constants/theme";
import { Button } from "@/components/Button";
import { useCategoriesDatabase } from "@/database/useCategoriesDatabase";
import { categoryColors, categoryIcons } from "@/constants/categoryOptions";
import { useCategoryStore } from "@/lib/store";

function NewCategory() {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const [color, setColor] = useState('');
    const { addCategory } = useCategoryStore();

    const categoryDb = useCategoriesDatabase();

    const handleIconChange = (value: string[] | string) => {
        if (Array.isArray(value)) {
            setIcon(value[0]);
        } else {
            setIcon(value);
        }
    }

    const handleColorChange = (value: string[] | string) => {
        if (Array.isArray(value)) {
            setColor(value[0]);
        } else {
            setColor(value);
        }
    }

    const handleSave = async () => {
        try {
            if (name === '' || icon === '') {
                throw new Error('All fields are required');
            }

            const res = await categoryDb.create({
                name,
                icon,
                color
            });
            addCategory({
                id: Number(res.id),
                name: res.name,
                icon: res.icon,
                color: res.color
            })

            Alert.alert('Success', 'Category added successfully with ID: ' + res.id);
        } catch (error) {
            if (error instanceof Error) {
                return Alert.alert('Error', error.message);
            }

            return Alert.alert('Error', 'An unknown error occurred');
        }
    }

    return (
        <PanelContainer>
            <TextField label="Description" onChangeText={setName} value={name} />
            <OptionSelector label="Icon" onChange={handleIconChange} onlyOne={true} options={
                categoryIcons.map((icon) => ({
                    value: icon,
                    children: <FontAwesome name={icon as any} size={16} color={ACCENT_COLORS.primary} />
                }))
            } />
            <OptionSelector label="Color" onChange={handleColorChange} onlyOne={true} options={
                categoryColors.map((color) => ({
                    value: color,
                    children: <FontAwesome name="circle" size={22} color={color} />
                }))
            } />
            <Button label="Save" onPress={() => handleSave()} />
        </PanelContainer>
    );
}

export default NewCategory;