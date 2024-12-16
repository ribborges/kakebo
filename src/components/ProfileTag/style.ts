import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

const baseStyles = StyleSheet.create({
    profileContainer: {
        flex: 1
    },
    profileTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileName: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 5,
        borderBottomWidth: 1
    }
});

const themeStyles = StyleSheet.create({
    profilePicLight: {
        backgroundColor: LIGHT_THEME.translucentContainerColor,
        borderColor: LIGHT_THEME.borderColor
    },
    profilePicDark: {
        backgroundColor: DARK_THEME.translucentContainerColor,
        borderColor: DARK_THEME.borderColor
    },
    profileNameLight: {
        color: LIGHT_THEME.color,
        borderBottomColor: LIGHT_THEME.borderColor
    },
    profileNameDark: {
        color: DARK_THEME.color,
        borderBottomColor: DARK_THEME.borderColor
    },
});

export { baseStyles, themeStyles };