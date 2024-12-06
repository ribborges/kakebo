import { ReactNode } from "react";
import { View, TouchableOpacity, Text, useColorScheme, TouchableOpacityProps, StyleSheet } from "react-native";

import { baseStyles, themeStyles } from "./style";

interface ButtonProps extends TouchableOpacityProps {
    label?: string;
    icon?: ReactNode;
}

function OptionButton({ label, icon, ...props }: ButtonProps) {
    const colorScheme = useColorScheme();
    const buttonLabelStyle = colorScheme === "dark" ? themeStyles.buttonLabelDark : themeStyles.buttonLabelLight;

    return (
        <TouchableOpacity style={baseStyles.optionButton} {...props}>
            {
                icon ? (
                    <View style={baseStyles.icon}>
                        {icon}
                    </View>
                ) : null
            }
            {
                label ? (
                    <Text style={[baseStyles.buttonLabel, buttonLabelStyle]}>{label}</Text>
                ) : null
            }
            {props.children}
        </TouchableOpacity>
    );
}

function Button({ label, icon, activeOpacity = 0.8, ...props }: ButtonProps) {
    return (
        <TouchableOpacity style={StyleSheet.flatten([baseStyles.button, props.style])} activeOpacity={activeOpacity} {...props}>
            {
                icon ? (
                    <View style={baseStyles.icon}>
                        {icon}
                    </View>
                ) : null
            }
            {
                label ? (
                    <Text style={baseStyles.buttonLabel}>{label}</Text>
                ) : null
            }
            {props.children}
        </TouchableOpacity>
    );
}

export { OptionButton, Button };