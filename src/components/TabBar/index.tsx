import React from 'react';
import { Text, Pressable, useColorScheme, PressableProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { baseStyles, themeStyles } from './style';

interface tabBarBtnProps extends PressableProps {
    isFocused: boolean,
    label: string,
    color: string,
    icon: any
}

function TabBarButton({ isFocused, label, color, icon, ...props }: tabBarBtnProps) {
    const colorScheme = useColorScheme();
    const labelTheme = isFocused ? themeStyles.labelDark : colorScheme === 'light' ? themeStyles.labelLight : themeStyles.labelDark;

    return (
        <Pressable {...props} style={[baseStyles.button, isFocused && baseStyles.selected]}>
            {icon({ focused: isFocused, color })}
            <Text style={[baseStyles.label, labelTheme]}>{label}</Text>
        </Pressable>
    )
}

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const colorScheme = useColorScheme();
    const themedTabBar = colorScheme === 'light' ? themeStyles.headerLight : themeStyles.headerDark;
    const primaryColor = '#0891b2';
    const greyColor = '#737373';

    return (
        <BlurView intensity={10} experimentalBlurMethod="dimezisBlurView" style={[baseStyles.tabbar, themedTabBar]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel as string
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const icon = options.tabBarIcon;

                if (['_sitemap', '+not-found'].includes(route.name)) return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        icon={icon}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        color={isFocused ? primaryColor : greyColor}
                        label={label}
                    />
                )
            })}
        </BlurView>
    )
}

export default TabBar;