import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, PressableProps, useColorScheme } from "react-native";

import { baseStyles, themeStyles } from "./style";

interface toggleButtonProps extends PressableProps {
    id?: string,
    active?: boolean,
    label: string
}

interface toggleContainerProps {
    id: string,
    items: Array<{
        label: string,
        content: React.ReactNode
    }>
}

export function ToggleButton(props: toggleButtonProps) {
    const colorScheme = useColorScheme();
    const themedLabel = colorScheme === 'dark' ? themeStyles.labelDark : themeStyles.labelLight;

    return (
        <Pressable {...props} style={baseStyles.toggleButton}>
            <Text style={[baseStyles.label, themedLabel]}>{props.label}</Text>
            <View style={props.active ? baseStyles.toggleBtnUndeline : baseStyles.toggleBtnUndelineDeactive}></View>
        </Pressable>
    );
}

export function Toggle(props: toggleContainerProps) {
    const [active, setActive] = useState(0);

    return (
        <View style={baseStyles.toggleContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={baseStyles.toggleInput}>
                {props.items.map((item, index) => {
                    return (
                        <ToggleButton
                            key={index}
                            label={item.label}
                            onPress={() => setActive(index)}
                            active={active === index}
                        />
                    )
                })}
            </ScrollView>
            <ScrollView style={baseStyles.content}>
                {props.items[active].content}
            </ScrollView>
        </View>
    );
}