import { View, Text, StyleSheet } from "react-native";
import { Toggle } from "@/components/Toggle";
import NewIncome from "@/screens/NewExpense";

export default function AddPage() {
    return (
        <View style={styles.scrollView}>
            <Toggle id="add" items={[
                {
                    label: "Income",
                    content: <Text style={{ color: "white" }}>Income</Text>
                }, {
                    label: "Expenses",
                    content: <NewIncome />
                }, {
                    label: "Savings",
                    content: <Text style={{ color: "white" }}>Savings</Text>
                }, {
                    label: "Category",
                    content: <Text style={{ color: "white" }}>History</Text>
                }
            ]} />
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1
    }
});