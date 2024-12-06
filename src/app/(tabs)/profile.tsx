import { View, StyleSheet, useColorScheme } from "react-native";
import { OptionButton } from "@/components/Button";
import { PanelContainer } from "@/components/Container";
import { ProfileTag } from "@/components/ProfileTag";
import { FontAwesome } from "@expo/vector-icons";
import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";

export default function ProfilePage() {
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === 'dark' ? DARK_THEME.color : LIGHT_THEME.color;

    const options = [
        {
            icon: <FontAwesome name="gear" size={22} color={iconColor} />,
            label: 'Settings'
        },
        {
            icon: <FontAwesome name="history" size={22} color={iconColor} />,
            label: 'Finacial history'
        },
        {
            icon: <FontAwesome name="info" size={22} color={iconColor} />,
            label: 'About'
        },
        {
            icon: <FontAwesome name="trash" size={22} color={iconColor} />,
            label: 'Delet all my data'
        }
    ];

    return (
        <View style={styles.profileContainer}>
            <ProfileTag />

            <PanelContainer style={{ padding: 5, gap: 10 }}>
                {
                    options.map((option, index) => (
                        <OptionButton key={index} label={option.label} icon={option.icon} />
                    ))
                }
            </PanelContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1
    }
});