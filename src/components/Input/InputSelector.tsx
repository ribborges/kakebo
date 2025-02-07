import React from "react";
import { useColorScheme, View } from "react-native";

import { Picker, PickerProps, PickerItemProps } from "@react-native-picker/picker";
import InputGroup from "./InputGroup";

interface Item extends PickerItemProps {
    label: string;
    value: string | number;
}

interface SelectorProps extends PickerProps {
    icon?: React.ReactNode;
    label?: string;
    items: Item[];
    value: string | number;
    onChange: (value: string | number) => void;
    style?: any;
}

export default function Selector({ items, value, onChange, style, ...props }: SelectorProps) {
    const colorScheme = useColorScheme();

    return (
        <InputGroup rootClassName="flex-1" icon={props.icon} label={props.label}>
            <View className="flex-1">
                <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    className="text-zinc-950 dark:text-zinc-100 flex-1"
                    dropdownIconColor={colorScheme === 'dark' ? "white" : "black"}
                    itemStyle={{
                        color: colorScheme === 'dark' ? "white" : "black",
                        backgroundColor: colorScheme === 'dark' ? "black" : "white"
                    }}
                    {...props}
                >
                    {items.map(item => (
                        <Picker.Item
                            key={item.value}
                            label={item.label}
                            value={item.value}
                            style={{
                                color: colorScheme === 'dark' ? "white" : "black",
                                backgroundColor: colorScheme === 'dark' ? "#333333" : "#dddddd"
                            }}
                        />
                    ))}
                </Picker>
            </View>
        </InputGroup>
    );
}