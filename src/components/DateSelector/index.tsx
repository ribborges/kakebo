import { useState } from "react";

import Selector from "@/components/Input/Selector";
import { PanelContainer } from "@/components/Container";
import { useFilterStore } from "@/lib/store";

export default function DateSelector() {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const { setDateFilter } = useFilterStore();

    const currentYear = (new Date()).getFullYear();
    const yearsList = Array.from(new Array(10), (val, index) => currentYear - index);

    const handleMonthChange = (value: string | number) => {
        setMonth(Number(value));
        setDateFilter(Number(value), year);
    }

    const handleYearChange = (value: string | number) => {
        setYear(Number(value));
        setDateFilter(month, Number(value));
    }

    return (
        <PanelContainer className="flex-row gap-2">
            <Selector
                placeholder="Month"
                value={month}
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
            <Selector
                placeholder="Year"
                value={year}
                onChange={handleYearChange}
                items={yearsList.map(year => ({
                    label: year.toString(),
                    value: year
                }))}
            />
        </PanelContainer>
    );
}