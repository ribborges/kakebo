import { ReactNode, useState } from "react";
import { StyleSheet, Text, useColorScheme, View, ScrollView, ScrollViewProps, TouchableOpacity, StyleProp, TextStyle } from "react-native";

import { baseStyles, themeStyles } from "./style";

interface OptionSelectorProps extends ScrollViewProps {
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    options?: {
        label?: string;
        value: string;
        children?: ReactNode;
    }[];
    selectedOption?: string[] | string;
    onlyOne?: boolean;
    onChange?: (value: string[] | string) => void
}

interface OptionItemProps {
    label?: string;
    value: string;
    children?: ReactNode;
    isSelected?: boolean;
    onPress?: (value: string) => void;
}

function OptionSelector({
    label,
    options,
    labelStyle,
    selectedOption,
    horizontal = true,
    showsHorizontalScrollIndicator = false,
    onlyOne = false,
    onChange,
    ...props
}: OptionSelectorProps) {
    const [selected, setSelected] = useState<string[] | string>(selectedOption || (onlyOne ? '' : []));

    const colorScheme = useColorScheme();
    const themedLabel = colorScheme === 'dark' ? themeStyles.labelDark : themeStyles.labelLight;

    function handleOptionSelect(value: string) {
        if (onlyOne) {
            selectedOption = value;
            setSelected(value);
            console.log(selectedOption);
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
        <View>
            {label && <Text style={StyleSheet.flatten([[baseStyles.label, themedLabel], labelStyle])}>{label}</Text>}
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
                            isSelected={onlyOne ? selected === option.value : selected.includes(option.value)}
                            onPress={handleOptionSelect}
                        />
                    ))
                }
            </ScrollView>
        </View>
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
            {label && <Text style={themedLabel}>{label}</Text>}
        </TouchableOpacity>
    );
}

export default OptionSelector;