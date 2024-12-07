import { ReactNode, useState } from "react";
import { StyleSheet, Text, useColorScheme, View, ScrollView, ScrollViewProps, TouchableOpacity } from "react-native";

import { baseStyles, themeStyles } from "./style";

interface OptionSelectorProps extends ScrollViewProps {
    options?: {
        label: string;
        value: string;
        children?: ReactNode;
    }[];
    selectedOption?: string[] | string;
    onlyOne?: boolean;
    onChange?: (value: string[] | string) => void
}

interface OptionItemProps {
    label: string;
    value: string;
    children?: ReactNode;
    isSelected?: boolean;
    onPress?: (value: string) => void;
}

function OptionSelector({
    options,
    selectedOption,
    horizontal = true,
    showsHorizontalScrollIndicator = false,
    onlyOne = false,
    onChange,
    ...props
}: OptionSelectorProps) {
    const [selected, setSelected] = useState<string[] | string>(selectedOption || (onlyOne ? '' : []));

    function handleOptionSelect(value: string) {
        if (onlyOne) {
            selectedOption = value;
            setSelected(value);
        } else {
            if (selectedOption?.includes(value)) {
                if (Array.isArray(selectedOption)) {
                    selectedOption = selectedOption.filter((option) => option !== value);
                    setSelected(selectedOption.filter((option) => option !== value));
                } else {
                    selectedOption = '';
                    setSelected('');
                }
            } else {
                selectedOption = [...(Array.isArray(selectedOption) ? selectedOption : []), value];
                setSelected([...(Array.isArray(selectedOption) ? selectedOption : []), value]);
            }
        }

        onChange && onChange(value);
    }

    return (
        <ScrollView
            horizontal={horizontal}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            style={StyleSheet.flatten([baseStyles.optionContainer, props.style])}
            {...props}
        >
            {
                options?.map((option) => (
                    <OptionItem
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        children={option.children}
                        isSelected={selected.includes(option.value)}
                        onPress={handleOptionSelect}
                    />
                ))
            }
        </ScrollView>
    );
}

function OptionItem({ label, value, children, isSelected, onPress, ...props }: OptionItemProps) {
    const colorScheme = useColorScheme();
    const themedOption = colorScheme === 'dark' ? themeStyles.optionDark : themeStyles.optionLight;
    const themedLabel = colorScheme === 'dark' ? themeStyles.labelDark : themeStyles.labelLight;

    return (
        <TouchableOpacity
            style={StyleSheet.flatten([baseStyles.option, themedOption, isSelected && baseStyles.selectedOption])}
            onPress={() => {
                onPress && onPress(value)
            }}
            {...props}
        >
            {children && <View style={baseStyles.icon}>{children}</View>}
            <Text style={themedLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

export default OptionSelector;