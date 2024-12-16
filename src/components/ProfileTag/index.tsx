import { Image, Text, useColorScheme, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { baseStyles, themeStyles } from "./style";
import { PanelContainer } from "../Container";
import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";

function ProfileTag() {
    const colorScheme = useColorScheme();
    const themedProfilePic = colorScheme === 'light' ? themeStyles.profilePicLight : themeStyles.profilePicDark;
    const themedProfileName = colorScheme === 'light' ? themeStyles.profileNameLight : themeStyles.profileNameDark;
    const themedIcon = colorScheme === 'light' ? LIGHT_THEME.color + "55" : DARK_THEME.color + "55";

    return (
        <PanelContainer style={baseStyles.profileTag}>
            <View style={[baseStyles.profilePic, themedProfilePic]}>
                <MaterialCommunityIcons name="cat" size={40} color={themedIcon} />
            </View>
            <Text style={[baseStyles.profileName, themedProfileName]}>Anna Elisa</Text>
        </PanelContainer>
    );
}

export { ProfileTag };