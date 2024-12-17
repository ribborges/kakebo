import { useState } from "react";
import { Alert, Text } from "react-native";
import { PanelContainer } from "@/components/Container";
import { OptionSelector, TextField } from "@/components/Input";
import { FontAwesome } from "@expo/vector-icons";
import { ACCENT_COLORS } from "@/constants/theme";
import { Button } from "@/components/Button";
import { useCategoriesDatabase } from "@/database/useCategoriesDatabase";

function NewCategory() {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const [color, setColor] = useState('');

    const categoryDb = useCategoriesDatabase();

    const handleIconChange = (value: string[] | string) => {
        if (Array.isArray(value)) {
            setIcon(value[0]);
        } else {
            setIcon(value);
        }
    }

    const handleColorChange = (value: string[] | string) => {
        if (Array.isArray(value)) {
            setColor(value[0]);
        } else {
            setColor(value);
        }
    }

    const handleSave = async () => {
        try {
            if (name === '' || icon === '') {
                throw new Error('All fields are required');
            }

            const res = await categoryDb.create({
                name,
                icon,
                color
            });

            Alert.alert('Success', 'Category added successfully with ID: ' + res.id);
        } catch (error) {
            if (error instanceof Error) {
                return Alert.alert('Error', error.message);
            }

            return Alert.alert('Error', 'An unknown error occurred');
        }
    }

    return (
        <PanelContainer>
            <TextField label="Description" onChangeText={setName} value={name} />
            <OptionSelector label="Icon" onChange={handleIconChange} onlyOne={true} options={[
                {
                    value: "address-book",
                    children: <FontAwesome name="address-book" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "anchor",
                    children: <FontAwesome name="anchor" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "bed",
                    children: <FontAwesome name="bed" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "bell",
                    children: <FontAwesome name="bell" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "bicycle",
                    children: <FontAwesome name="bicycle" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "binoculars",
                    children: <FontAwesome name="binoculars" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "birthday-cake",
                    children: <FontAwesome name="birthday-cake" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "bus",
                    children: <FontAwesome name="bus" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "camera",
                    children: <FontAwesome name="camera" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "coffee",
                    children: <FontAwesome name="coffee" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "compass",
                    children: <FontAwesome name="compass" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "calculator",
                    children: <FontAwesome name="calculator" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "car",
                    children: <FontAwesome name="car" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "child",
                    children: <FontAwesome name="child" size={16} color={ACCENT_COLORS.primary} />
                }, {
                    value: "cloud",
                    children: <FontAwesome name="cloud" size={16} color={ACCENT_COLORS.primary} />
                }
            ]} />
            <OptionSelector label="Color" onChange={handleColorChange} onlyOne={true} options={[
                {
                    value: "white",
                    children: <FontAwesome name="circle" size={22} color={"#ffffff"} />
                }, {
                    value: "black",
                    children: <FontAwesome name="circle" size={22} color={"#000000"} />
                }, {
                    value: "gray",
                    children: <FontAwesome name="circle" size={22} color={"#808080"} />
                }, {
                    value: "red",
                    children: <FontAwesome name="circle" size={22} color={"#ff0000"} />
                }, {
                    value: "green",
                    children: <FontAwesome name="circle" size={22} color={"#00ff00"} />
                }, {
                    value: "blue",
                    children: <FontAwesome name="circle" size={22} color={"#0000ff"} />
                }, {
                    value: "yellow",
                    children: <FontAwesome name="circle" size={22} color={"#ffff00"} />
                }, {
                    value: "purple",
                    children: <FontAwesome name="circle" size={22} color={"#ff00ff"} />
                }, {
                    value: "orange",
                    children: <FontAwesome name="circle" size={22} color={"#ffa500"} />
                }, {
                    value: "pink",
                    children: <FontAwesome name="circle" size={22} color={"#ffc0cb"} />
                }, {
                    value: "brown",
                    children: <FontAwesome name="circle" size={22} color={"#a52a2a"} />
                }, {
                    value: "cyan",
                    children: <FontAwesome name="circle" size={22} color={"#00ffff"} />
                }, {
                    value: "magenta",
                    children: <FontAwesome name="circle" size={22} color={"#ff00ff"} />
                }, {
                    value: "lime",
                    children: <FontAwesome name="circle" size={22} color={"#00ff00"} />
                }, {
                    value: "teal",
                    children: <FontAwesome name="circle" size={22} color={"#008080"} />
                }
            ]} />
            <Button label="Save" onPress={() => handleSave()} />
            <Text style={{ color: "#eee" }}>{icon}</Text>
        </PanelContainer>
    );
}

export default NewCategory;