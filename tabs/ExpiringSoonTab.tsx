import IngredientsCards from "@/components/ui/cards/IngredientsCards";
import IngredientsContext from "@/contexts/IngredientsContext";
import Ingredient from "@/types/Ingredient";
import isExpiringInNhours from "@/utils/isExpiringInNhours";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExpiringSoonTab() {
  const { ingredients } = useContext(IngredientsContext);

  const getFilteredData = (data: Ingredient[] = ingredients) => {
    return data.filter(
      (ingredient) =>
        isExpiringInNhours(72, ingredient) || ((ingredient.open || ingredient.ripeness === 'Ripe' || ingredient.ripeness === 'Advanced' || ingredient.ripeness === 'Too ripe') && ingredient.confectionType !== 'Frozen')
    )
  }

  const [filteredIngredients, setFilterIngredients] = useState(getFilteredData());

  const handlefIlter = () => {
    setFilterIngredients(getFilteredData())
  };

  useEffect(() => {
    handlefIlter()
  }, [ingredients])

  const focus = async () => {
    let deviceIngredients = await AsyncStorage.getItem('ingredients')
    if (deviceIngredients) {
      setFilterIngredients(getFilteredData(JSON.parse(deviceIngredients)))
    } else {
      Alert.alert("Error while getting ingredients from device");
    }
  }

  useFocusEffect(() => {
    focus()
  })

  return (
    <SafeAreaView style={{ paddingHorizontal: 25, backgroundColor: '#9f64648d', flex: 1 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 700,
          textAlign: "center",
          marginVertical: 5,
          marginBottom: 20,
          borderColor: "black",
          borderWidth: 2,
          borderRadius: 18,
          marginLeft: 50,
          marginRight: 50,
          backgroundColor: "#4d194db5",

        }}
      >
        Expiring Soon
      </Text>
      <ScrollView>
        {!filteredIngredients || filteredIngredients?.length === 0 ? (
          <Text>There are NO INGREDIENTS!</Text>
        ) : (
          <IngredientsCards ingredients={filteredIngredients} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
