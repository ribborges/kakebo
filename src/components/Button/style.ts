import { DARK_THEME, LIGHT_THEME } from '@/constants/theme';
import { StyleSheet } from 'react-native';

const baseStyles = StyleSheet.create({
    button: {
        padding: 16,
        flexDirection: 'row',
        gap: 10,
    },
    icon: {
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLabel: {
        color: '#eeeeee',
        fontSize: 16
    }
});

const themeStyles = ({
    buttonLabelLight: {
        color: LIGHT_THEME.color
    },
    buttonLabelDark: {
        color: DARK_THEME.color
    }
});

export { baseStyles, themeStyles };