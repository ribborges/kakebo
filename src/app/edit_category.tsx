import { useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome6, FontAwesome } from "@expo/vector-icons";

import { InputText, OptionSelector, Button } from "@/components/Input";
import { Container } from "@/components/Container";
import { useCategoryStore } from "@/lib/store";
import useModal from "@/hooks/useModal";
import { useCategoriesDatabase } from "@/database/useCategoriesDatabase";
import { categoryColors, categoryIcons } from "@/constants/categoryOptions";

export default function EditCategory() {
    const router = useRouter();

    const { id } = useLocalSearchParams() as unknown as { id: string };
    const { categories, updateCategory } = useCategoryStore();
    const categoryDb = useCategoriesDatabase();
    const category = categories.find(category => category.id === parseInt(id));

    const [categoryData, setCategoryData] = useState({
        name: category?.name || '',
        icon: category?.icon || '',
        color: category?.color || '',
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
        setCategoryData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSave = async () => {
        try {
            if (categoryData.name === '' || categoryData.icon === '') {
                throw new Error('All fields are required');
            }

            const res = await categoryDb.update(parseInt(id), {
                name: categoryData.name,
                icon: categoryData.icon,
                color: categoryData.color
            });
            updateCategory(parseInt(id), {
                id: Number(res.id),
                name: res.name,
                icon: res.icon,
                color: res.color
            })

            resultModal('Success', 'Category "' + res.name + '" updated successfully');
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
            <InputText
                id='name'
                name='name'
                value={categoryData.name}
                onChange={onChange}
                icon={<FontAwesome6 name="file-text" />}
                label='Name'
                placeholder="Sallary"
            />
            <OptionSelector
                id='icon'
                name='icon'
                value={categoryData.icon}
                onChange={onChange}
                icon={<FontAwesome6 name="icons" />}
                label='Icon'
                options={
                    categoryIcons.map((icon) => ({
                        value: icon,
                        children: <FontAwesome name={icon as any} size={16} color="#ca8a04" />
                    }))
                }
            />
            <OptionSelector
                id='color'
                name='color'
                value={categoryData.color}
                onChange={onChange}
                icon={<FontAwesome6 name="palette" />}
                label='Color'
                options={
                    categoryColors.map((color) => ({
                        value: color,
                        children: <FontAwesome name="circle" size={22} color={color} />
                    }))
                }
            />
            <Button label="Save" onPress={() => handleSave()} />
        </Container>
    );
}