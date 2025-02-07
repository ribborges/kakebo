import { ReactNode } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import clsx from "clsx";

import InputGroup from "./InputGroup";

interface OptionSelectorProps {
    icon?: ReactNode;
    label?: string;
    id?: string;
    name?: string;
    options?: {
        label?: string;
        value: string;
        children?: ReactNode;
    }[];
    value?: string;
    onChange?: (value: string, name: string) => void,
    horizontal?: boolean;
    showsHorizontalScrollIndicator?: boolean;
}

interface OptionItemProps {
    label?: string;
    value: string;
    children?: ReactNode;
    isSelected?: boolean;
    onPress?: (value: string) => void;
}

function OptionSelector({
    icon,
    id,
    name,
    label,
    options,
    value,
    onChange,
    horizontal = true,
    showsHorizontalScrollIndicator = false
}: OptionSelectorProps) {
    const handleOptionSelect = (newValue: string) => {
        value = newValue;

        if (onChange) {
            onChange(newValue, name || '');
        }
    }

    return (
        <InputGroup labelInside label={label} icon={icon} className="flex-col">
            <ScrollView
                id={id}
                horizontal={horizontal}
                showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
                contentContainerClassName="flex-row gap-2 p-2"
            >
                {
                    options?.map((option) => (
                        <OptionItem
                            key={option.value}
                            label={option.label}
                            value={option.value}
                            children={option.children}
                            isSelected={value === option.value}
                            onPress={handleOptionSelect}
                        />
                    ))
                }
            </ScrollView>
        </InputGroup>
    );
}

function OptionItem({ label, value, children, isSelected, onPress }: OptionItemProps) {
    return (
        <TouchableOpacity
            className={clsx(
                `
                    flex-col items-center justify-center gap-2
                    p-6
                    border border-solid rounded-xl
                `,
                isSelected ? "border-yellow-600 bg-yellow-600/50" : "border-zinc-300 dark:border-zinc-700",
            )}
            onPress={() => {
                onPress && onPress(value)
            }}
        >
            {children && <View className="h-6 w-6 items-center justify-center">{children}</View>}
            {label && <Text className="text-zinc-700 dark:text-zinc-300">{label}</Text>}
        </TouchableOpacity>
    );
}

export default OptionSelector;