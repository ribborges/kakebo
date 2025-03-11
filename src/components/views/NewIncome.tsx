import { useState } from "react";
import { View, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

import { PanelContainer } from "@/components/Container";
import { InputText, Button } from "@/components/Input";
import { useTransactionDatabase } from "@/database/useTransactionDatabase";
import { useTransactionStore } from "@/lib/store";
import useModal from "@/hooks/useModal";

function NewIncome() {
  const [incomeData, setIncomeData] = useState({
    value: '',
    description: ''
  });

  const { addTransaction } = useTransactionStore();
  const transactionDb = useTransactionDatabase();

  const { show } = useModal();

  const resultModal = (title: string, message: string) => {
    show({
      title,
      content: (
        <View className="gap-2 px-6 pb-6">
          <Text className="text-zinc-800 dark:text-zinc-200">{message}</Text>
        </View>
      )
    });
  }

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

      resultModal('Success', 'Income "' + res.description + '" added successfully');
    } catch (error) {
      if (error instanceof Error) {
        resultModal('Error', error.message);
        return;
      }

      resultModal('Error', 'An unknown error occurred');
      return;
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