import { useState } from "react";
import { View, Text } from "react-native";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";

import { PanelContainer } from "@/components/Container";
import { OptionSelector, InputText, Button } from "@/components/Input";
import { categoryColors, categoryIcons } from "@/constants/categoryOptions";
import { useCategoryStore } from "@/lib/store";
import { useCategoriesDatabase } from "@/database/useCategoriesDatabase";
import useModal from "@/hooks/useModal";

function NewCategory() {
    const [categoryData, setCategoryData] = useState({
        name: '',
        icon: '',
        color: ''
    });

    const { addCategory } = useCategoryStore();
    const categoryDb = useCategoriesDatabase();

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

            const res = await categoryDb.create({
                name: categoryData.name,
                icon: categoryData.icon,
                color: categoryData.color
            });
            addCategory({
                id: Number(res.id),
                name: res.name,
                icon: res.icon,
                color: res.color
            })

            resultModal('Success', 'Category "' + res.name + '" added successfully');
        } catch (error) {
            if (error instanceof Error) {
                resultModal('Error', error.message);
                return;
            }

            resultModal('Error', 'An unknown error occurred');
            return;
        } finally {
            setCategoryData({
                name: '',
                icon: '',
                color: ''
            });
        }
    }

    return (
        <PanelContainer className="gap-2">
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
        </PanelContainer>
    );
}

export default NewCategory;