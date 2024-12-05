import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

const baseStyles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10
    },
    containerPanel: {
        margin: 10,
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        elevation: 2
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        paddingBottom: 5,
        borderBottomWidth: 1,
    }
});

const themeStyles = StyleSheet.create({
    containerLight: {
        backgroundColor: LIGHT_THEME.containerColor,
        borderColor: LIGHT_THEME.borderColor,
        shadowColor: LIGHT_THEME.shadowColor,
    },
    containerDark: {
        backgroundColor: DARK_THEME.containerColor,
        borderColor: DARK_THEME.borderColor,
        shadowColor: DARK_THEME.shadowColor,
    },
    titleLight: {
        color: LIGHT_THEME.color,
        borderBottomColor: LIGHT_THEME.borderColor
    },
    titleDark: {
        color: DARK_THEME.color,
        borderBottomColor: DARK_THEME.borderColor
    }
});

export { baseStyles, themeStyles };