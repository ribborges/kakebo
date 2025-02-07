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
                "h-16 w-16",
                "m-2 p-5",
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
        <View className="
            overflow-hidden
            absolute bottom-2 self-center
            bg-zinc-100/40 dark:bg-zinc-950/40
            border border-b-2 border-solid rounded-full
            border-zinc-50/40 dark:border-zinc-900/40
        ">
            <BlurView
                intensity={15}
                experimentalBlurMethod="dimezisBlurView"
                className="flex-row justify-between items-center"
            >
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
                            label={label}
                        />
                    )
                })}
            </BlurView>
        </View>
    )
}

export default TabBar;