import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { PanelContainer } from '@/components/Container';
import { useCategoryStore, useTransactionStore } from '@/lib/store';
import { Dropdown } from '@/components/Dropdown';
import { useCategoriesDatabase } from '@/database/useCategoriesDatabase';
import useModal from '@/hooks/useModal';

interface ExpenseCategoryProps {
    id: number;
    title: string;
    icon: string;
    amount: number;
    iconColor?: string;
}

function Categories() {
    const { categories } = useCategoryStore();
    const { transactions } = useTransactionStore();

    return (
        <PanelContainer title="Expense Categories">
            <View className="gap-8 pt-2">
                {
                    categories.map((category, index) => (
                        <Category
                            key={index}
                            id={category.id}
                            title={category.name}
                            icon={category.icon}
                            iconColor={category.color}
                            amount={
                                transactions
                                    .filter((transaction) => transaction.category_id === category.id)
                                    .reduce((acc, curr) => acc + curr.value, 0)
                            }
                        />
                    ))
                }
            </View>
        </PanelContainer>
    );
}

function Category({ id, title, icon, iconColor, amount }: ExpenseCategoryProps) {
    const router = useRouter();

    const categoryDb = useCategoriesDatabase();
    const { categories, deleteCategory } = useCategoryStore();
    const { transactions } = useTransactionStore();

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

    const handleDelete = async (id: number) => {
        if (transactions.some((transaction) => transaction.category_id === id)) {
            resultModal('Error', 'Cannot delete category with transactions');
        } else {
            await categoryDb.remove(id);
            deleteCategory(categories.findIndex((transaction) => transaction.id === id));
        }
    }

    return (
        <View className="flex-row items-center gap-4">
            <View className="h-12 w-12 items-center justify-center">
                <FontAwesome name={icon as any} size={24} color={iconColor || "#854d0e"} />
            </View>
            <View className="flex-1 gap-1">
                <Text className="text-base font-black text-black dark:text-white">{title}</Text>
                <Text className="text-sm text-zinc-700 dark:text-zinc-300">${amount}</Text>
            </View>
            <Dropdown align="right" items={[
                {
                    label: "Edit",
                    icon: <Entypo name="pencil" size={14} />,
                    onClick: () => router.navigate({ pathname: "/edit_category", params: { id } })
                },
                {
                    label: "Delete",
                    icon: <FontAwesome5 name="trash" size={14} />,
                    onClick: () => handleDelete(id)
                }
            ]}>
                <Text className="text-zinc-600 dark:text-zinc-400">
                    <Entypo name="dots-three-vertical" size={20} />
                </Text>
            </Dropdown>
        </View>
    );
}

export { Categories, Category };