import { View, StyleSheet } from "react-native";
import { Toggle } from "@/components/Toggle";
import NewExpense from "@/screens/NewExpense";
import NewCategory from "@/screens/NewCategory";
import NewIncome from "@/screens/NewIncome";
import NewSaving from "@/screens/NewSaving";

export default function AddPage() {
    return (
        <View style={styles.scrollView}>
            <Toggle id="add" items={[
                {
                    label: "Income",
                    content: <NewIncome />
                }, {
                    label: "Expenses",
                    content: <NewExpense />
                }, {
                    label: "Savings",
                    content: <NewSaving />
                }, {
                    label: "Category",
                    content: <NewCategory />
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