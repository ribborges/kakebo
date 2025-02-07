import { ReactNode } from "react";
import { TextInput } from "react-native";

import InputGroup from "./InputGroup";

interface TextInputProps {
    disabled?: boolean,
    id?: string,
    name?: string,
    onChange?: (value: string, name: string) => void,
    value?: string,
    className?: string,
    icon?: ReactNode,
    placeholder?: string,
    autoCapitalize?: "none" | "sentences" | "words" | "characters",
    label?: string,
    children?: ReactNode,
}

export default function InputText(props: TextInputProps) {
    return (
        <InputGroup icon={props.icon} label={props.label}>
            <TextInput
                id={props.id}
                value={props.value}
                onChangeText={(text: string) => (props.onChange && props.name) && props.onChange(text, props.name)}
                placeholder={props.placeholder}
                autoCapitalize={props.autoCapitalize}
                placeholderTextColor={"grey"}
                className="p-4 text-zinc-950 dark:text-zinc-100 flex-1"
                cursorColor={"grey"}
            />
        </InputGroup>
    );
}