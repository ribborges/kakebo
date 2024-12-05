import { ACCENT_COLORS, DARK_THEME, LIGHT_THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

const baseStyles = StyleSheet.create({
    toggleContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    toggleInput: {
        flexDirection: 'row',
        gap: 20,
    },
    toggleButton: {
        padding: 10
    },
    label: {
        fontSize: 16
    },
    toggleBtnUndeline: {
        backgroundColor: ACCENT_COLORS.primary,
        height: 4,
        borderRadius: 5,
        width: '100%',
        marginTop: 5
    },
    toggleBtnUndelineDeactive: {
        backgroundColor: 'transparent',
        height: 4,
        borderRadius: 5,
        width: '100%',
        marginTop: 5
    },
    content: {
        flexDirection: 'column',
        width: '100%',
    }
});

const themeStyles = StyleSheet.create({
    labelLight: {
        color: LIGHT_THEME.color
    },
    labelDark: {
        color: DARK_THEME.color
    }
});

export { baseStyles, themeStyles };