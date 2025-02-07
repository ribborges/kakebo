import { View, Alert, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { OptionButton } from "@/components/Input";
import { PanelContainer } from "@/components/Container";
import { UserTag } from "@/components/User";
import { useResetData } from "@/database/useResetData";
import { useCategoryStore, useTransactionStore } from "@/lib/store";
import { useCategoriesDatabase } from "@/database/useCategoriesDatabase";
import { Spacer } from "@/components/Separator";

export default function ProfilePage() {
    const { setTransactions } = useTransactionStore();
    const { setCategories } = useCategoryStore();

    const reset = useResetData();
    const categoriesDb = useCategoriesDatabase();

    const resetData = async () => {
        try {
            await reset.deleteDatabase();
            setTransactions([]);
            setCategories(await categoriesDb.list());
            Alert.alert('Data has been reset');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View className="p-4 flex-1">
            <UserTag />
            <Spacer space={30} />
            <PanelContainer className="g-2">
                {/*
                    <OptionButton
                        label="Settings"
                        icon={<FontAwesome name="gear" size={22} />}
                        onPress={() => Alert.alert('Settings')}
                    />
                */}
                {/*
                    <OptionButton
                        label="Financial history"
                        icon={<FontAwesome name="history" size={22} />}
                        onPress={() => Alert.alert('Financial history')}
                    />
                */}
                <OptionButton
                    label="About"
                    icon={<FontAwesome name="info" size={22} />}
                    onPress={() => Alert.alert('About', 'This is a simple expense tracker app - v1.0.2', [{ text: 'GitHub', onPress: () => Linking.openURL('https://github.com/ribborges/kakebo') }, { text: 'OK' }])}
                />
                <OptionButton
                    label="Reset data"
                    icon={<FontAwesome name="trash" size={22} />}
                    onPress={resetData}
                />
            </PanelContainer>
        </View>
    );
}