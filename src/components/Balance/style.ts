import { ACCENT_COLORS, DARK_THEME, LIGHT_THEME } from '@/constants/theme';
import { StyleSheet } from 'react-native';

const baseStyles = StyleSheet.create({
    balanceValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: ACCENT_COLORS.primary,
        textAlign: 'center'
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1
    },
    summaryItem: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    },
    summaryLabel: {
        fontSize: 14
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: ACCENT_COLORS.seccondary,
        marginTop: 4
    }
});

const themeStyles = StyleSheet.create({
    summaryContainerLight: {
        borderTopColor: LIGHT_THEME.borderColor
    },
    summaryContainerDark: {
        borderTopColor: DARK_THEME.borderColor
    },
    summaryLabelLight: {
        color: LIGHT_THEME.secondaryColor
    },
    summaryLabelDark: {
        color: DARK_THEME.secondaryColor
    }
});

export { baseStyles, themeStyles };