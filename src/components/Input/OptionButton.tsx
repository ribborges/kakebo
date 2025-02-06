import { ReactNode } from "react";
import { TouchableOpacityProps, TouchableOpacity, View, Text } from "react-native";

interface OptionButtonProps extends TouchableOpacityProps {
    label?: string;
    icon?: ReactNode;
}

export default function OptionButton({ label, icon, ...props }: OptionButtonProps) {
    return (
        <TouchableOpacity className="p-4 flex-row gap-2" {...props}>
            {
                icon ? (
                    <View className="h-6 w-6 justify-center items-center">
                        {icon}
                    </View>
                ) : null
            }
            {
                label ? (
                    <Text className="text-zinc-700 dark:text-zinc-300 font-bold text-base">{label}</Text>
                ) : null
            }
            {props.children}
        </TouchableOpacity>
    );
}