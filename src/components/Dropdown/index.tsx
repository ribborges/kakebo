import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { View, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import { MenuOption } from '@/components/Input';

interface DropdownProps {
    align?: 'left' | 'right' | 'center',
    items: DropdownItemProps[],
    disabled?: boolean
    children: ReactNode
}

interface DropdownItemProps {
    icon?: ReactNode,
    label: string,
    onClick?: () => void
}

export function Dropdown({ align = 'left', items, disabled, children }: DropdownProps) {
    const triggerRef = useRef<View>(null);
    const modalRef = useRef<View>(null);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });

    let modalWidth = 0;

    useEffect(() => {
        if (modalRef.current && triggerRef.current && visible) {
            modalRef.current.measure((fx, fy, width, height, px, py) => {
                modalWidth = width;
            });

            triggerRef.current.measure((fx, fy, width, height, px, py) => {
                setPosition({
                    x:
                        align === 'right' ? px - modalWidth + width * 2 :
                            align === 'center' ? px :
                                align === 'left' ? px + width : 0,
                    y: py + height,
                    width: width,
                });
            });
        }
    }, [visible]);

    const toggleVisible = () => {
        setVisible(!visible);
    }

    return (
        <View>
            <TouchableOpacity ref={triggerRef} disabled={disabled} onPress={toggleVisible} className="p-2">
                <View>
                    {children}
                </View>
            </TouchableOpacity>
            {visible && (
                <Modal
                    transparent={true}
                    visible={visible}
                    animationType="fade"
                    onRequestClose={toggleVisible}
                >
                    <TouchableWithoutFeedback onPress={toggleVisible}>
                        <View className="flex-1 justify-start items-start">
                            <View ref={modalRef}
                                className="
                                    absolute p-2 gap-1
                                    bg-zinc-100 dark:bg-zinc-900
                                    border border-solid rounded-xl
                                    border-zinc-200 dark:border-zinc-800
                                "
                                style={{
                                    top: position.y,
                                    left: position.x - position.width,
                                }}
                            >
                                {
                                    items.map((item, index) => (
                                        <MenuOption
                                            key={index}
                                            label={item.label}
                                            icon={item.icon}
                                            onPress={() => {
                                                toggleVisible();
                                                item.onClick && item.onClick();
                                            }}
                                        />
                                    ))
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </View>
    );
};