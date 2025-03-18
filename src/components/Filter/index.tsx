import { useState, ReactNode } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import clsx from "clsx";

interface FilterButtonProps {
    id?: string,
    active?: boolean,
    icon?: ReactNode,
    label: string,
    onPress: () => void,
    onLongPress?: () => void
}

interface FilterContainerProps {
    id: string,
    items: Array<{
        icon?: ReactNode,
        label: string,
        onLongPress?: () => void,
        content: ReactNode
    }>
}

export function FilterButton(props: FilterButtonProps) {
    return (
        <TouchableOpacity
            className={clsx(
                `
                    p-3
                    flex-row items-center gap-2
                    border border-solid rounded-full
                `,
                props.active ? "border-yellow-600 bg-yellow-600/50" : "first-line:border-zinc-200 dark:border-zinc-800"
            )}
            onPress={props.onPress}
            onLongPress={props.onLongPress}
        >
            {props.icon && <Text className="text-zinc-700 dark:text-zinc-300">{props.icon}</Text>}
            {props.label && <Text className="text-zinc-700 dark:text-zinc-300">{props.label}</Text>}
        </TouchableOpacity>
    );
}

export function Filter(props: FilterContainerProps) {
    const [active, setActive] = useState(0);

    return (
        <View className="gap-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="flex-row gap-2">
                {props.items.map((item, index) => {
                    return (
                        <FilterButton
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            onPress={() => setActive(index)}
                            onLongPress={item.onLongPress}
                            active={active === index}
                        />
                    )
                })}
            </ScrollView>
            <ScrollView contentContainerClassName="gap-2">
                {props.items[active].content}
            </ScrollView>
        </View>
    );
}