import { useState } from "react";
import { View, Text, ScrollView, Pressable, PressableProps } from "react-native";

import clsx from "clsx";

interface toggleButtonProps extends PressableProps {
    id?: string,
    active?: boolean,
    label: string
}

interface toggleContainerProps {
    id: string,
    items: Array<{
        label: string,
        content: React.ReactNode
    }>
}

export function ToggleButton(props: toggleButtonProps) {
    return (
        <Pressable {...props} className="p-2">
            <Text className="text-base text-black dark:text-white">{props.label}</Text>
            <View className={clsx(
                "h-1 w-full mt-1 rounded-xl",
                props.active ? "bg-yellow-500" : "bg-transparent"
            )}></View>
        </Pressable>
    );
}

export function Toggle(props: toggleContainerProps) {
    const [active, setActive] = useState(0);

    return (
        <View className="w-full items-center justify-center">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="flex-row gap-2">
                {props.items.map((item, index) => {
                    return (
                        <ToggleButton
                            key={index}
                            label={item.label}
                            onPress={() => setActive(index)}
                            active={active === index}
                        />
                    )
                })}
            </ScrollView>
            <ScrollView className="w-full">
                {props.items[active].content}
            </ScrollView>
        </View>
    );
}