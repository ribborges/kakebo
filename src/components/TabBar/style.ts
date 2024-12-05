import { StyleSheet } from 'react-native';

import { ACCENT_COLORS, DARK_THEME, LIGHT_THEME } from '@/constants/theme';

const baseStyles = StyleSheet.create({
    tabbar: {
        borderWidth: 1,
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        marginHorizontal: 80,
        padding: 2,
        borderRadius: 99,
        elevation: 5,
        gap: 5
    },
    button: {
        height: 55,
        width: 55,
        padding: 10,
        margin: 5,
        borderRadius: 99,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 10
    }
});

const themeStyles = StyleSheet.create({
    headerLight: {
        backgroundColor: LIGHT_THEME.translucentContainerColor,
        borderColor: LIGHT_THEME.borderColor,
        shadowColor: LIGHT_THEME.shadowColor,
    },
    headerDark: {
        backgroundColor: DARK_THEME.translucentContainerColor,
        borderColor: DARK_THEME.borderColor,
        shadowColor: DARK_THEME.shadowColor,
    },
    labelLight: {
        color: LIGHT_THEME.color
    },
    labelDark: {
        color: DARK_THEME.color
    },
    selectedLight: {
        borderWidth: 1,
        backgroundColor: LIGHT_THEME.traslucentContainerSecondaryColor,
        borderColor: LIGHT_THEME.translucentContainerColor
    },
    selectedDark: {
        borderWidth: 1,
        backgroundColor: DARK_THEME.traslucentContainerSecondaryColor,
        borderColor: DARK_THEME.translucentContainerColor
    }
});

export { baseStyles, themeStyles };