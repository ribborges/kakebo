import { View } from "react-native";

import SeparatorProps from "./SeparatorProps";

export default function Blanckspace({ space = 60, vertical, className }: SeparatorProps) {
    return <View className={className}
        style={vertical ? { width: space } : { height: space }}
    />;
}