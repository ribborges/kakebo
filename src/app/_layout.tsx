import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import BackBtn from "@/components/BackBtn";
import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        statusBarStyle: colorScheme === "light" ? "dark" : "light",
        statusBarBackgroundColor: colorScheme === "light" ? LIGHT_THEME.containerColor : DARK_THEME.containerColor,
        header: ({ navigation, route, options, back }) => {
          return (
            <Header
              leftButton={
                back ? <BackBtn onPress={navigation.goBack} /> : undefined
              }
            />
          );
        },
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
