import { ReactNode } from "react";
import { TouchableOpacityProps, TouchableOpacity, Text } from "react-native";

interface OptionButtonProps extends TouchableOpacityProps {
    label?: string;
    icon?: ReactNode;
}

export default function MenuOption({ label, icon, ...props }: OptionButtonProps) {
    return (
        <TouchableOpacity className="p-2 flex-row items-center gap-2" {...props}>
            {
                icon ? (
                    <Text className="w-6 text-center text-zinc-700 dark:text-zinc-300">
                        {icon}
                    </Text>
                ) : null
            }
            {
                label ? (
                    <Text className="text-zinc-700 dark:text-zinc-300">{label}</Text>
                ) : null
            }
            {props.children}
        </TouchableOpacity>
    );
}