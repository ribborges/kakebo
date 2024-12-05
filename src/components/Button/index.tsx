import { ReactNode } from "react";
import { View, TouchableOpacity, Text, useColorScheme } from "react-native";
import { baseStyles, themeStyles } from "./style";

interface ButtonProps {
    label: string;
    icon: ReactNode;
}

function Button({ label, icon }: ButtonProps) {
    const colorScheme = useColorScheme();
    const buttonLabelStyle = colorScheme === "dark" ? themeStyles.buttonLabelDark : themeStyles.buttonLabelLight;

    return (
        <TouchableOpacity style={baseStyles.button}>
            <View style={baseStyles.icon}>
                {icon}
            </View>
            <Text style={[baseStyles.buttonLabel, buttonLabelStyle]}>{label}</Text>
        </TouchableOpacity>
    );
}

export { Button };