import { StyleSheet } from "react-native";

import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";

const baseStyles = StyleSheet.create({
    header: {
        top: 0,
        left: 0,
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        elevation: 2,
    },
    status: {
        backgroundColor: 'red',
        height: 20,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
    }
});

const themeStyles = StyleSheet.create({
    headerLight: {
        backgroundColor: LIGHT_THEME.containerColor,
        borderColor: LIGHT_THEME.borderColor,
        shadowColor: LIGHT_THEME.shadowColor,
    },
    headerDark: {
        backgroundColor: DARK_THEME.containerColor,
        borderColor: DARK_THEME.borderColor,
        shadowColor: DARK_THEME.shadowColor,
    },
});

export { baseStyles, themeStyles };