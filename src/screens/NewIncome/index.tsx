import { useState } from "react";
import { Alert } from "react-native";
import { PanelContainer } from "@/components/Container";
import { TextField } from "@/components/Input";
import { Button } from "@/components/Button";
import { useTransactionDatabase } from "@/database/useTransactionDatabase";
import { useTransactionStore } from "@/lib/store";

function NewIncome() {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const transactionDb = useTransactionDatabase();
  const { addTransaction } = useTransactionStore();

  const handleSave = async () => {
    try {
      if (value === '' || description === '') {
        throw new Error('All fields are required');
      }

      if (isNaN(parseFloat(value))) {
        throw new Error('Value must be a number');
      }

      const res = await transactionDb.create({
        value: parseFloat(value),
        date: new Date().toISOString(),
        description,
        transaction_type: 1,
        category_id: null
      });
      addTransaction({
        id: Number(res.id),
        value: res.value,
        date: res.date,
        description: res.description,
        transaction_type: res.transaction_type,
        category_id: res.category_id
      });

      Alert.alert('Success', 'Income added successfully with ID: ' + res.id);
    } catch (error) {
      if (error instanceof Error) {
        return Alert.alert('Error', error.message);
      }

      return Alert.alert('Error', 'An unknown error occurred');
    } finally {
      setValue('');
      setDescription('');
    }
  };

  return (
    <PanelContainer>
      <TextField label="Value" onChangeText={setValue} value={value} keyboardType="number-pad" />
      <TextField label="Description" onChangeText={setDescription} value={description} />
      <Button label="Save" onPress={() => handleSave()} />
    </PanelContainer>
  );
}

export default NewIncome;