import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import * as SystemUI from 'expo-system-ui';

import { dbName, initializeDatabase } from "@/database/db";
import ModalProvider from "@/providers/ModalProvider";

import '@/styles/global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  SystemUI.setBackgroundColorAsync(colorScheme === 'light' ? 'white' : 'black');

  return (
    <SQLiteProvider databaseName={dbName} onInit={initializeDatabase}>
      <ModalProvider>
        <Stack
          screenOptions={{
            animation: "slide_from_right",
            headerStyle: { backgroundColor: colorScheme === 'light' ? 'white' : 'black' },
            headerTitleStyle: { color: colorScheme === 'light' ? 'black' : 'white' },
            headerTintColor: colorScheme === 'light' ? 'black' : 'white',
            headerShadowVisible: false,
            contentStyle: { backgroundColor: colorScheme === 'light' ? 'white' : 'black' },
            statusBarStyle: colorScheme === 'light' ? 'dark' : 'light',
            statusBarBackgroundColor: colorScheme === 'light' ? 'white' : 'black'
          }}
        >
          <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
          <Stack.Screen options={{ title: "Edit Transaction" }} name="edit_transaction" />
        </Stack>
      </ModalProvider>
    </SQLiteProvider>
  );
}
