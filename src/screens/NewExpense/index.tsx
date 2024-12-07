import { useState } from "react";
import { Text } from "react-native";
import { Button } from "@/components/Button";
import { PanelContainer } from "@/components/Container";
import { TextField, OptionSelector } from "@/components/Input";
import { FontAwesome } from "@expo/vector-icons";

function NewIncome() {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (value: string[] | string) => {
        if (Array.isArray(value)) {
            setSelectedCategory(value[0]);
        } else {
            setSelectedCategory(value);
        }
    }

    return (
        <PanelContainer>
            <TextField label="Value" />
            <TextField label="Description" />
            <OptionSelector onChange={handleCategoryChange} onlyOne={true} options={[
                {
                    label: "Survival",
                    value: "survival",
                    children: <FontAwesome name="shopping-cart" size={22} color={"#ffe600"} />
                }, {
                    label: "Leisure",
                    value: "leisure",
                    children: <FontAwesome name="coffee" size={22} color={"#00ccff"} />
                },
                {
                    label: "Culture",
                    value: "culture",
                    children: <FontAwesome name="book" size={22} color={"#ff00ff"} />
                },
                {
                    label: "Extra",
                    value: "extra",
                    children: <FontAwesome name="dollar" size={22} color={"#00ff00"} />
                }
            ]} />
            <Button label="Save" onPress={() => {}} />
            <Text style={{ color: "#eee" }}>{selectedCategory}</Text>
        </PanelContainer>
    );
}

export default NewIncome;