import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, useColorScheme, View, ViewStyle, ScrollView, ScrollViewProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ACCENT_COLORS, DARK_THEME, LIGHT_THEME } from "@/constants/theme";

import { baseStyles, themeStyles } from "./style";

interface TextFieldProps extends TextInputProps {
    label?: string;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
}

interface OptionSelectorProps extends ScrollViewProps {
    options?: {
        label: string;
        value: string;
        icon?: ReactNode;
    }[];
    selectedOption?: string;
    onOptionSelect?: (option: string) => void;
}

interface OptionItemProps extends TouchableOpacityProps {
    label: string;
    icon?: ReactNode;
}

function TextField({ label, containerStyle, labelStyle, ...props }: TextFieldProps) {
    const colorScheme = useColorScheme();
    const themedInput = colorScheme === 'dark' ? themeStyles.inputDark : themeStyles.inputLight;
    const themedLabel = colorScheme === 'dark' ? themeStyles.labelDark : themeStyles.labelLight;

    return (
        <View style={StyleSheet.flatten([baseStyles.inputContainer, containerStyle])}>
            {label && <Text style={StyleSheet.flatten([[baseStyles.label, themedLabel], labelStyle])}>{label}</Text>}
            <TextInput
                cursorColor={ACCENT_COLORS.seccondary}
                placeholderTextColor={colorScheme === 'light' ? LIGHT_THEME.secondaryColor : DARK_THEME.secondaryColor}
                {...props}
                style={StyleSheet.flatten([[baseStyles.input, themedInput], props.style])}
            >
                {props.children}
            </TextInput>
        </View>
    );
}

function OptionItem({ label, icon, ...props }: OptionItemProps) {
    const colorScheme = useColorScheme();
    const themedOption = colorScheme === 'dark' ? themeStyles.optionDark : themeStyles.optionLight;
    const themedLabel = colorScheme === 'dark' ? themeStyles.labelDark : themeStyles.labelLight;

    return (
        <TouchableOpacity style={StyleSheet.flatten([[baseStyles.option, themedOption]])} {...props}>
            {icon && <View style={baseStyles.icon}>{icon}</View>}
            <Text style={themedLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

function OptionSelector({
    options,
    selectedOption,
    onOptionSelect,
    horizontal = true,
    showsHorizontalScrollIndicator = false,
    ...props
}: OptionSelectorProps) {
    return (
        <ScrollView
            horizontal={horizontal}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            style={StyleSheet.flatten([baseStyles.optionContainer, props.style])}
            {...props}>
            {
                options?.map((option, index) => (
                    <OptionItem key={index} label={option.label} icon={option.icon} />
                ))
            }
        </ScrollView>
    );
}

export { TextField, OptionSelector };