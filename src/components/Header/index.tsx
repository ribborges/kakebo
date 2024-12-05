import { Image, View, useColorScheme } from "react-native";
import { baseStyles, themeStyles } from "./style";

export default function Header({ leftButton }: { leftButton?: JSX.Element }) {
    const colorScheme = useColorScheme();
    const themedHeader = colorScheme === 'light' ? themeStyles.headerLight : themeStyles.headerDark;

    return (
        <View style={[baseStyles.header, themedHeader]}>
            {leftButton}
            <Image
                source={require('assets/images/icon.png')}
                style={{ width: 40, height: 40 }}
            />
        </View>
    );
}