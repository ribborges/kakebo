import { View, Text, Linking } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { Button, MenuOption } from "@/components/Input";
import { UserTag } from "@/components/User";
import { useResetData } from "@/database/useResetData";
import { useCategoryStore, useTransactionStore } from "@/lib/store";
import { useCategoriesDatabase } from "@/database/useCategoriesDatabase";
import { Spacer } from "@/components/Separator";
import useModal from "@/hooks/useModal";
import TextLink from "@/components/TextLink";

export default function ProfilePage() {
  const router = useRouter();
  
  const { setTransactions } = useTransactionStore();
  const { setCategories } = useCategoryStore();

  const reset = useResetData();
  const categoriesDb = useCategoriesDatabase();

  const { show, hide } = useModal();

  const aboutModal = () => {
    show({
      title: 'About',
      content:
        <View className="gap-2 px-6 pb-6">
          <Text className="text-zinc-800 dark:text-zinc-200">A simple expense tracker app</Text>
          <Text className="text-zinc-800 dark:text-zinc-200">This is a free and open source project ❤️</Text>
          <View className="flex-row items-center gap-1">
            <Text className="text-zinc-800 dark:text-zinc-200">Source code:</Text>
            <TextLink onPress={() => Linking.openURL('https://github.com/ribborges/kakebo')}>Github</TextLink>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-zinc-800 dark:text-zinc-200">Licensed under:</Text>
            <TextLink onPress={() => Linking.openURL('https://www.mozilla.org/en-US/MPL/2.0/')}>Mozilla Public License v2.0</TextLink>
          </View>
          <Text className="text-zinc-800 dark:text-zinc-200">v1.0.6</Text>
        </View>
    });
  }

  const resetModal = () => {
    show({
      title: 'Reset data',
      content:
        <View className="gap-2 px-6 pb-6">
          <Text className="text-zinc-800 dark:text-zinc-200">Are you sure you want to reset all data?</Text>
          <Text className="text-red-500">This action cannot be undone!</Text>
          <View className="flex-row">
            <Button buttonColors="bg-red-500 border-red-500" label="Yes" onPress={resetData} />
            <Button label="Cancel" onPress={hide} />
          </View>
        </View>
    });
  }

  const resetData = async () => {
    try {
      await reset.deleteDatabase();
      setTransactions([]);
      setCategories(await categoriesDb.list());
      hide();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="p-4 flex-1">
      <UserTag />
      <Spacer space={30} />
      <View className="gap-2">
        {/*
                    <MenuOption
                        label="Settings"
                        icon={<FontAwesome name="gear" size={22} />}
                        onPress={() => Alert.alert('Settings')}
                    />
                */}
        <MenuOption
          label="Financial history"
          icon={<FontAwesome name="history" size={22} />}
          onPress={() => router.navigate({ pathname: "/financial_history" })}
        />
        <MenuOption
          label="About"
          icon={<FontAwesome name="info" size={20} />}
          onPress={aboutModal}
        />
        <MenuOption
          label="Reset data"
          icon={<FontAwesome name="trash" size={20} />}
          onPress={resetModal}
        />
      </View>
    </View>
  );
}
