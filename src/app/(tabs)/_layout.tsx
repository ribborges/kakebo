import { useColorScheme } from 'react-native';
import { Tabs } from 'expo-router';
import React from 'react';
import { Foundation, Octicons } from '@expo/vector-icons';

import TabBar from '@/components/TabBar';
import { DARK_THEME, LIGHT_THEME } from '@/constants/theme';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === 'light' ? LIGHT_THEME.color : DARK_THEME.color;
    const bkColor = colorScheme === 'light' ? LIGHT_THEME.backgroundColor : DARK_THEME.backgroundColor;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                sceneStyle: {
                    backgroundColor: bkColor
                }
            }}
            tabBar={props => <TabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        focused ? <Foundation name={'home'} size={18} color={DARK_THEME.color} />
                            : <Octicons name={'home'} size={16} color={iconColor} />
                    ),
                }}
            />

            <Tabs.Screen
                name="add"
                options={{
                    title: 'Add',
                    tabBarIcon: ({ focused }) => (
                        focused ? <Foundation name={'plus'} size={16} color={DARK_THEME.color} />
                            : <Octicons name={'plus'} size={16} color={iconColor} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        focused ? <Octicons name={'person-fill'} size={16} color={DARK_THEME.color} />
                            : <Octicons name={'person'} size={16} color={iconColor} />
                    ),
                }}
            />
        </Tabs>
    );
}