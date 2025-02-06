import { useColorScheme } from 'react-native';
import { Tabs } from 'expo-router';
import React from 'react';
import { Foundation, Octicons } from '@expo/vector-icons';

import TabBar from '@/components/TabBar';
import Header from '@/components/Header';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                header: ({ navigation, route, options }) => {
                    return (
                        <Header />
                    );
                },
                sceneStyle: {
                    backgroundColor: colorScheme === 'light' ? 'white' : 'black',
                }
            }}
            tabBar={props => <TabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: () => (
                        <Foundation name={'home'} size={22} />
                    ),
                }}
            />

            <Tabs.Screen
                name="add"
                options={{
                    title: 'Add',
                    tabBarIcon: () => (
                        <Foundation name={'plus'} size={22} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: () => (
                        <Octicons name={'person-fill'} size={22} />
                    ),
                }}
            />
        </Tabs>
    );
}