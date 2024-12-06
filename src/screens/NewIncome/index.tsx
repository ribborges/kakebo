import { Button } from "@/components/Button";
import { PanelContainer } from "@/components/Container";
import { TextField, OptionSelector } from "@/components/Input";
import { FontAwesome } from "@expo/vector-icons";

function NewIncome() {
    return (
        <PanelContainer>
            <TextField label="Value" />
            <TextField label="Description" />
            <OptionSelector options={[
                {
                    label: "Survival",
                    value: "survival",
                    icon: <FontAwesome name="shopping-cart" size={22} color={"#ffe600"} />
                }, {
                    label: "Leisure",
                    value: "leisure",
                    icon: <FontAwesome name="coffee" size={22} color={"#00ccff"} />
                },
                {
                    label: "Culture",
                    value: "culture",
                    icon: <FontAwesome name="book" size={22} color={"#ff00ff"} />
                },
                {
                    label: "Extra",
                    value: "extra",
                    icon: <FontAwesome name="dollar" size={22} color={"#00ff00"} />
                }
            ]} />
            <Button label="Save" onPress={() => {}} />
        </PanelContainer>
    );
}

export default NewIncome;