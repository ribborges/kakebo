import { Image, Text, useColorScheme } from "react-native";
import { baseStyles, themeStyles } from "./style";
import { PanelContainer } from "../Container";

function ProfileTag() {
    const colorScheme = useColorScheme();
    const themedProfilePic = colorScheme === 'light' ? themeStyles.profilePicLight : themeStyles.profilePicDark;
    const themedProfileName = colorScheme === 'light' ? themeStyles.profileNameLight : themeStyles.profileNameDark;

    return (
        <PanelContainer style={baseStyles.profileTag}>
            <Image source={require('assets/images/icon.png')} style={[baseStyles.profilePic, themedProfilePic]} />
            <Text style={[baseStyles.profileName, themedProfileName]}>Anna Elisa</Text>
        </PanelContainer>
    );
}

export { ProfileTag };