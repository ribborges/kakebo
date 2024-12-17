import { View, StyleSheet, useColorScheme, Alert } from "react-native";
import { OptionButton } from "@/components/Button";
import { PanelContainer } from "@/components/Container";
import { ProfileTag } from "@/components/ProfileTag";
import { FontAwesome } from "@expo/vector-icons";
import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";
import { useResetData } from "@/database/useResetData";

export default function ProfilePage() {
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === 'dark' ? DARK_THEME.color : LIGHT_THEME.color;

    const reset = useResetData();

    const resetData = async () => {
        try {
            await reset.deleteDatabase();
            Alert.alert('Data has been reset');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.profileContainer}>
            <ProfileTag />

            <PanelContainer style={{ padding: 5, gap: 10 }}>
                <OptionButton
                    label="Settings"
                    icon={<FontAwesome name="gear" size={22} color={iconColor} />}
                    onPress={() => Alert.alert('Settings')}
                />
                <OptionButton
                    label="Financial history"
                    icon={<FontAwesome name="history" size={22} color={iconColor} />}
                    onPress={() => Alert.alert('Financial history')}
                />
                <OptionButton
                    label="About"
                    icon={<FontAwesome name="info" size={22} color={iconColor} />}
                    onPress={() => Alert.alert('About')}
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

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1
    }
});