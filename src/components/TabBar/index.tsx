import React from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import clsx from 'clsx';

interface tabBarBtnProps extends PressableProps {
    isFocused: boolean,
    label: string,
    icon: any
}

function TabBarButton({ isFocused, label, icon, ...props }: tabBarBtnProps) {
    return (
        <Pressable {...props}
            className={clsx(
                "h-12 w-12",
                "m-2",
                "items-center justify-center",
                "rounded-full",
                isFocused ? "bg-yellow-500 dark:bg-yellow-800" : "bg-transparent"
            )}
        >
            <Text className={isFocused ? "text-yellow-800 dark:text-yellow-500" : "text-zinc-700 dark:text-zinc-300"}>
                {icon({ focused: isFocused })}
            </Text>
        </Pressable>
    )
}

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (

        <BlurView
            intensity={10}
            blurReductionFactor={5}
            experimentalBlurMethod="dimezisBlurView"
            className="
                absolute bottom-2 overflow-hidden
                self-center rounded-full
            "
        >
            <View className="flex-row justify-between items-center bg-zinc-100/40 dark:bg-zinc-950/40">
                {
                    state.routes.map((route, index) => {
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
                                label={label}
                            />
                        )
                    })
                }
            </View>
        </BlurView>

    )
}

export default TabBar;