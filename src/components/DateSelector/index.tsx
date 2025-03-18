import { View } from "react-native";

import { InputSelector } from "@/components/Input";
import { useFilterStore } from "@/lib/store";

export default function DateSelector() {
    const { setDateFilter, dateFilter } = useFilterStore();

    const currentYear = (new Date()).getFullYear();
    const yearsList = Array.from(new Array(10), (val, index) => currentYear - index);

    const handleMonthChange = (value: string | number) => {
        setDateFilter(Number(value), dateFilter.year);
    }

    const handleYearChange = (value: string | number) => {
        setDateFilter(dateFilter.month, Number(value));
    }

    return (
        <View className="flex-row gap-2 p-2">
            <InputSelector
                placeholder="Month"
                value={dateFilter.month}
                onChange={handleMonthChange}
                items={[{
                    label: 'January',
                    value: 1
                }, {
                    label: 'February',
                    value: 2
                }, {
                    label: 'March',
                    value: 3
                }, {
                    label: 'April',
                    value: 4
                }, {
                    label: 'May',
                    value: 5
                }, {
                    label: 'June',
                    value: 6
                }, {
                    label: 'July',
                    value: 7
                }, {
                    label: 'August',
                    value: 8
                }, {
                    label: 'September',
                    value: 9
                }, {
                    label: 'October',
                    value: 10
                }, {
                    label: 'November',
                    value: 11
                }, {
                    label: 'December',
                    value: 12
                }]}
            />
            <InputSelector
                placeholder="Year"
                value={dateFilter.year}
                onChange={handleYearChange}
                items={yearsList.map(year => ({
                    label: year.toString(),
                    value: year
                }))}
            />
        </View>
    );
}