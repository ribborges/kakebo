import { useState } from "react";
import { Alert } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

import { PanelContainer } from "@/components/Container";
import { InputText, Button } from "@/components/Input";
import { useTransactionDatabase } from "@/database/useTransactionDatabase";
import { useTransactionStore } from "@/lib/store";

function NewIncome() {
  const [incomeData, setIncomeData] = useState({
    value: '',
    description: ''
  });

  const { addTransaction } = useTransactionStore();
  const transactionDb = useTransactionDatabase();

  const onChange = (value: string, name: string) => {
    setIncomeData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSave = async () => {
    try {
      if (incomeData.value === '' || incomeData.description === '') {
        throw new Error('All fields are required');
      }

      if (isNaN(parseFloat(incomeData.value))) {
        throw new Error('Value must be a number');
      }

      const res = await transactionDb.create({
        value: parseFloat(incomeData.value),
        date: new Date().toISOString(),
        description: incomeData.description,
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
      setIncomeData({
        value: '',
        description: ''
      });
    }
  };

  return (
    <PanelContainer className="gap-2">
      <InputText
        id='value'
        name='value'
        value={incomeData.value}
        onChange={onChange}
        icon={<FontAwesome6 name="coins" />}
        label='Value'
        placeholder="00.00"
        keyboardType="number-pad"
      />
      <InputText
        id='description'
        name='description'
        value={incomeData.description}
        onChange={onChange}
        icon={<FontAwesome6 name="file-text" />}
        label='Description'
        placeholder="Sallary"
      />
      <Button label="Save" onPress={() => handleSave()} />
    </PanelContainer>
  );
}

export default NewIncome;