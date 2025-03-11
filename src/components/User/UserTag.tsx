import { View } from "react-native";

import ProfilePic from "./ProfilePic";
import UserInfo from "./UserInfo";

interface ProfileTagProps {
    name?: string;
    src?: string;
}

function UserTag({ name, src }: ProfileTagProps) {
    return (
        <View className="flex-row items-center gap-4">
            <ProfilePic className="h-24 w-24" src={src} iconSize={32} />
            <UserInfo name={name || "Kakebo User"} size="xl" />
        </View>
    );
}

export default UserTag;