import { StyleSheet } from "react-native";
import { ACCENT_COLORS, DARK_THEME, LIGHT_THEME } from "@/constants/theme";

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
    },
    optionContainer: {
        flexDirection: 'row',
        gap: 10
    },
    option: {
        alignItems: 'center',
        padding: 20,
        margin: 5,
        borderRadius: 22,
        borderWidth: 1,
        gap: 5
    },
    selectedOption: {
        borderColor: ACCENT_COLORS.seccondary,
        backgroundColor: ACCENT_COLORS.seccondary + '22'
    },
    icon: {
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    optionLight: {
        color: LIGHT_THEME.color,
        backgroundColor: LIGHT_THEME.translucentContainerColor,
        borderColor: LIGHT_THEME.borderColor
    },
    optionDark: {
        color: DARK_THEME.color,
        backgroundColor: DARK_THEME.translucentContainerColor,
        borderColor: DARK_THEME.borderColor
    }
});

export { baseStyles, themeStyles };