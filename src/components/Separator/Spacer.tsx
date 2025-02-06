import { View } from "react-native";
import clsx from "clsx";

import SeparatorProps from "./SeparatorProps";

export default function Spacer({ space = 60, vertical, className }: SeparatorProps) {
    return <View
        style={vertical ? { marginRight: space / 2, marginLeft: space / 2 } : { marginTop: space / 2, marginBottom: space / 2 }}
        className={clsx(
            "box-border border-solid border-zinc-500/50",
            vertical ? "h-full border-r" : "w-full border-t",
            className || ""
        )} />;
}