import { View, Text } from "react-native";
import { clsx } from 'clsx';

interface UserInfoProps {
    name?: string;
    username?: string;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function UserInfo({ name, username, size = "sm" }: UserInfoProps) {
    return (
        <View className="flex flex-col p-2 whitespace-nowrap">
            <Text className={clsx(
                "font-bold",
                "text-black dark:text-white",
                size === "sm" ? "text-sm" : size === "md" ? "text-base" : size === "lg" ? "text-lg" : size === "xl" ? "text-xl" : "text-2xl",
            )}>{name}</Text>
            <Text className={clsx(
                "text-black dark:text-white",
                size === "sm" ? "text-xs" : size === "md" ? "text-sm" : size === "lg" ? "text-base" : size === "xl" ? "text-lg" : "text-xl"
            )}>{username}</Text>
        </View>
    );
}