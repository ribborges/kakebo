import { ReactNode } from "react";
import { Text } from "react-native";

export default function Label({ children }: { children: ReactNode }) {
    return (
        <Text className="ml-2 font-bold text-zinc-950 dark:text-zinc-100">
            {children}
        </Text>
    );
}