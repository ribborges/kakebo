import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent } from "react-native";

export default function BackBtn({ onPress }: { onPress: (event: GestureResponderEvent) => void }) {
    return (
        <View style={styles.backBtn}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    backBtn: {
        backgroundColor: '#22222244',
        overflow: 'hidden',
        padding: 10,
        alignItems: 'center',
        margin: 5,
        borderRadius: 10,
        borderColor: '#0e0e0e86',
        borderWidth: 1,
        borderBottomWidth: 2,
    },
    backBtnText: {
        color: '#FFFFFF',
    }
});