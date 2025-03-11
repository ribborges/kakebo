import { ReactNode } from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";

interface ModalProps {
    closeBtn: () => void,
    title?: string,
    visible: boolean,
    children?: ReactNode
}

export default function ModalContainer(props: ModalProps) {
    return (
        <Modal className="flex-1" visible={props.visible} transparent={true} animationType="fade">
            <BlurView
                className="flex-1"
                intensity={15}
                experimentalBlurMethod="dimezisBlurView"
            >
                <View className="flex-1 flex-row items-center bg-white/50 dark:bg-black/50">
                    <View className="
                                m-6
                                flex-1 gap-4
                                bg-zinc-100 dark:bg-zinc-900
                                border border-solid rounded-xl
                                border-zinc-200 dark:border-zinc-800
                            ">
                        <View className="flex-row justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-800">
                            <Text className="text-zinc-900 dark:text-zinc-100 text-lg font-bold">
                                {props.title}
                            </Text>
                            <TouchableOpacity
                                className="h-8 w-8 bg-red-500 rounded-full p-2 items-center justify-center"
                                onPress={() => props.closeBtn()}
                            >
                                <Text className="text-zinc-900 dark:text-zinc-100">
                                    <FontAwesome name="close" />
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {props.children}
                    </View>
                </View>
            </BlurView>
        </Modal>
    )
}