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
                bg-zinc-100 bg-opacity-50 dark:bg-zinc-900 dark:bg-opacity-50
                border border-solid rounded-3xl
                border-zinc-200 border-opacity-50 dark:border-zinc-800 dark:border-opacity-50
            `, className
        )}>
            {title ? <Title>{title}</Title> : <></>}
            {title ? <Spacer space={15} /> : <></>}
            {children}
        </View>
    );
}

export { Container, PanelContainer };