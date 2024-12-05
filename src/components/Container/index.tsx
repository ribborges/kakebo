import { View, Text, useColorScheme, StyleProp, ViewStyle, StyleSheet } from 'react-native';

import { baseStyles, themeStyles } from './style';

interface ContainerProps {
    title?: string;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

function Container({ title, style, children }: ContainerProps) {
    const colorScheme = useColorScheme();
    const themedTitle = colorScheme === 'light' ? themeStyles.titleLight : themeStyles.titleDark;

    return (
        <View style={StyleSheet.flatten([baseStyles.container, style])}>
            {title ? <Text style={[baseStyles.title, themedTitle]}>{title}</Text> : <></>}
            {children}
        </View>
    );
}

function PanelContainer({ title, style, children }: ContainerProps) {
    const colorScheme = useColorScheme();
    const themedContainer = colorScheme === 'light' ? themeStyles.containerLight : themeStyles.containerDark;
    const themedTitle = colorScheme === 'light' ? themeStyles.titleLight : themeStyles.titleDark;

    return (
        <View style={StyleSheet.flatten([[baseStyles.containerPanel, themedContainer], style])}>
            {title ? <Text style={[baseStyles.title, themedTitle]}>{title}</Text> : <></>}
            {children}
        </View>
    );
}

export { Container, PanelContainer };