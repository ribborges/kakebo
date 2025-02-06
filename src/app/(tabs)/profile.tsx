import { View, StyleSheet, useColorScheme, Alert, Linking } from "react-native";
import { OptionButton } from "@/components/Input";
import { PanelContainer } from "@/components/Container";
import { ProfileTag } from "@/components/ProfileTag";
import { FontAwesome } from "@expo/vector-icons";
import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";
import { useResetData } from "@/database/useResetData";
import { useCategoryStore, useTransactionStore } from "@/lib/store";
import { useCategoriesDatabase } from "@/database/useCategoriesDatabase";

export default function ProfilePage() {
    const colorScheme = useColorScheme();
    const { setTransactions } = useTransactionStore();
    const { setCategories } = useCategoryStore();

    const iconColor = colorScheme === 'dark' ? DARK_THEME.color : LIGHT_THEME.color;

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
        <View className="flex-1">
            <ProfileTag />

            <PanelContainer className="p-1 g-2">
                {/*
                    <OptionButton
                        label="Settings"
                        icon={<FontAwesome name="gear" size={22} color={iconColor} />}
                        onPress={() => Alert.alert('Settings')}
                    />
                */}
                {/*
                    <OptionButton
                        label="Financial history"
                        icon={<FontAwesome name="history" size={22} color={iconColor} />}
                        onPress={() => Alert.alert('Financial history')}
                    />
                */}
                <OptionButton
                    label="About"
                    icon={<FontAwesome name="info" size={22} color={iconColor} />}
                    onPress={() => Alert.alert('About', 'This is a simple expense tracker app - v1.0.2', [{ text: 'GitHub', onPress: () => Linking.openURL('https://github.com/ribborges/kakebo') }, { text: 'OK' }])}
                />
                <OptionButton
                    label="Reset data"
                    icon={<FontAwesome name="trash" size={22} color={iconColor} />}
                    onPress={resetData}
                />
            </PanelContainer>
        </View>
    );
}