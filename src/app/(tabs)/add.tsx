import { View } from "react-native";

import { Toggle } from "@/components/Toggle";
import NewExpense from "@/components/views/NewExpense";
import NewCategory from "@/components/views/NewCategory";
import NewIncome from "@/components/views/NewIncome";
import NewSaving from "@/components/views/NewSaving";

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