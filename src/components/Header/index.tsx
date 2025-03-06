import { Image, View } from "react-native";

export default function Header() {
    return (
        <View className="
            p-3
            flex-row justify-between items-center
            bg-white dark:bg-black
            border-b border-solid border-zinc-100 dark:border-zinc-900
        ">
            <View className="flex-1" />
            <View className="flex-1 items-center justify-center">
                <Image
                    source={require('#/images/icon.png')}
                    className="w-10 h-10"
                />
            </View>
            <View className="flex-1" />
        </View>
    );
}