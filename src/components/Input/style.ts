import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

const baseStyles = StyleSheet.create({
    inputContainer: {
        marginVertical: 5,
        gap: 5
    },
    input: {
        borderRadius: 99,
        padding: 10,
        borderWidth: 1
    },
    label: {
        marginHorizontal: 10,
        fontWeight: "bold"
    }
});

const themeStyles = StyleSheet.create({
    inputLight: {
        color: LIGHT_THEME.color,
        backgroundColor: LIGHT_THEME.translucentContainerColor,
        borderColor: LIGHT_THEME.borderColor
    },
    inputDark: {
        color: DARK_THEME.color,
        backgroundColor: DARK_THEME.translucentContainerColor,
        borderColor: DARK_THEME.borderColor
    },
    labelLight: {
        color: LIGHT_THEME.color
    },
    labelDark: {
        color: DARK_THEME.color
    }
});

export { baseStyles, themeStyles };