import React from "react";
import { useColorScheme, View } from "react-native";
import { Picker, PickerProps, PickerItemProps } from "@react-native-picker/picker";
import { baseStyles, themeStyles } from "./style";
import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";

interface Item extends PickerItemProps {
    label: string;
    value: string | number;
}

interface SelectorProps extends PickerProps {
    items: Item[];
    value: string | number;
    onChange: (value: string | number) => void;
    style?: any;
}

export default function Selector({ items, value, onChange, style, ...props }: SelectorProps) {
    const colorScheme = useColorScheme();
    const themedContainer = colorScheme === 'dark' ? themeStyles.selectorContainerDark : themeStyles.selectorContainerLight;
    const themedPicker = colorScheme === 'dark' ? themeStyles.pickerDark : themeStyles.pickerLight;
    const arrowColor = colorScheme === 'dark' ? DARK_THEME.color : LIGHT_THEME.color;
    const themedItem = colorScheme === 'dark' ? themeStyles.pickerItemDark : themeStyles.pickerItemLight;

    return (
        <View style={[baseStyles.selectorContainer, themedContainer]}>
            <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={[themedPicker, style]}
                dropdownIconColor={arrowColor}
                itemStyle={themedItem}
                {...props}
            >
                {items.map(item => (
                    <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                        style={themedItem}
                    />
                ))}
            </Picker>
        </View>
    );
}