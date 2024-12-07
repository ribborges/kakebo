import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, useColorScheme, View, ViewStyle } from "react-native";
import { ACCENT_COLORS, DARK_THEME, LIGHT_THEME } from "@/constants/theme";

import { baseStyles, themeStyles } from "./style";

interface TextFieldProps extends TextInputProps {
    label?: string;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
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
                style={StyleSheet.flatten([baseStyles.input, themedInput, props.style])}
            >
                {props.children}
            </TextInput>
        </View>
    );
}

export default TextField;