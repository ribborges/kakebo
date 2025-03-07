import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import clsx from "clsx";

interface ButtonProps {
    label?: string,
    disabled?: boolean,
    id?: string,
    className?: string,
    buttonColors?: string,
    onPress?: (event: GestureResponderEvent) => void
}

export default function Button({ buttonColors = "bg-yellow-600 border-yellow-600", ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            id={props.id}
            disabled={props.disabled}
            activeOpacity={0.8}
            onPress={props.onPress}
            className={clsx(
                `
                    disabled:bg-transparent
                    border border-solid rounded-3xl
                    basis-[max-content] items-center justify-center content-center gap-2
                    p-4 m-1
                `, buttonColors, props.className
            )}
        >
            <Text className={props.disabled ? "text-zinc-500/50" : "text-zinc-300"}>{props.label}</Text>
        </TouchableOpacity>
    );
}