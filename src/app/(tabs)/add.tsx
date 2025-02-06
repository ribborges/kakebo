import { View } from "react-native";

import { Toggle } from "@/components/Toggle";
import NewExpense from "@/screens/NewExpense";
import NewCategory from "@/screens/NewCategory";
import NewIncome from "@/screens/NewIncome";
import NewSaving from "@/screens/NewSaving";

export default function AddPage() {
    return (
        <View className="flex-1">
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