import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

const baseStyles = StyleSheet.create({
    category: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16
    },
    categoryIcon: {
        width: 45,
        height: 45,
        borderRadius: 18,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    categoryDetails: {
        flex: 1
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: '500'
    },
    categoryAmount: {
        fontSize: 14,
        marginTop: 4
    },
    spacer: {
        height: 80
    }
});

const themeStyles = StyleSheet.create({
    categoryIconLight: {
        backgroundColor: LIGHT_THEME.translucentContainerColor,
        borderColor: LIGHT_THEME.borderColor
    },
    categoryIconDark: {
        backgroundColor: DARK_THEME.translucentContainerColor,
        borderColor: DARK_THEME.borderColor
    },
    categoryTitleLight: {
        color: LIGHT_THEME.color
    },
    categoryTitleDark: {
        color: DARK_THEME.color
    },
    categoryAmountLight: {
        color: LIGHT_THEME.secondaryColor
    },
    categoryAmountDark: {
        color: DARK_THEME.secondaryColor
    }
});

export { baseStyles, themeStyles };