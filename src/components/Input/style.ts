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
    },
    selectorContainer: {
        flex: 1,
        overflow: "hidden",
        borderRadius: 99,
        borderWidth: 1
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
    },
    selectorContainerLight: {
        borderColor: LIGHT_THEME.borderColor
    },
    selectorContainerDark: {
        borderColor: DARK_THEME.borderColor
    },
    pickerLight: {
        color: LIGHT_THEME.color,
        backgroundColor: LIGHT_THEME.translucentContainerColor,
    },
    pickerDark: {
        color: DARK_THEME.color,
        backgroundColor: DARK_THEME.translucentContainerColor,
    },
    pickerItemLight: {
        color: LIGHT_THEME.color,
        backgroundColor: LIGHT_THEME.containerColor,
    },
    pickerItemDark: {
        color: DARK_THEME.color,
        backgroundColor: DARK_THEME.containerColor,
    }
});

export { baseStyles, themeStyles };