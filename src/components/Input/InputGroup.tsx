import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { clsx } from "clsx";

import Label from "./Label";

interface InputGroupProps {
    className?: string,
    rootClassName?: string,
    icon?: ReactNode,
    label?: string,
    labelInside?: boolean,
    htmlFor?: string,
    children?: ReactNode
}

export default function InputGroup(props: InputGroupProps) {
    return (
        <View className={props.rootClassName}>
            {
                props.label && !props.labelInside ?
                    <Label>
                        {props.label}
                    </Label> : <></>
            }
            <View className={clsx(
                props.className || "",
                `
                m-1
                flex-row flex-nowrap
                border-2 border-solid rounded-xl
                border-zinc-200 dark:border-zinc-900
                overflow-hidden
                `
            )}>
                {
                    (props.icon || props.label) &&
                    <View className="gap-2 flex-row items-center p-4">
                        {props.icon && <Text className="text-zinc-950 dark:text-zinc-100">{props.icon}</Text>}
                        {
                            props.label && props.labelInside ?
                                <Label>
                                    {props.label}
                                </Label> : <></>
                        }
                    </View>
                }
                {props.children}
            </View>
        </View>
    );
}