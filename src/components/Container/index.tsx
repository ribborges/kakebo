import React from 'react';
import { View } from 'react-native';
import clsx from 'clsx';

import Title from '@/components/Title';
import { Spacer } from '@/components/Separator';

interface ContainerProps {
    title?: string;
    className?: string;
    children?: React.ReactNode;
}

function Container({ title, className, children }: ContainerProps) {
    return (
        <View className={clsx(
            "m-2 p-2",
            className
        )}>
            {title ? <Title>{title}</Title> : <></>}
            {title ? <Spacer space={15} /> : <></>}
            {children}
        </View>
    );
}

function PanelContainer({ title, className, children }: ContainerProps) {
    return (
        <View className={clsx(
            `
                m-2 p-4
                bg-zinc-100 dark:bg-zinc-950
                border border-solid rounded-3xl
                border-zinc-200 dark:border-zinc-900
            `, className
        )}>
            {title ? <Title>{title}</Title> : <></>}
            {title ? <Spacer space={15} /> : <></>}
            {children}
        </View>
    );
}

export { Container, PanelContainer };