import IngredientsCards from "@/components/ui/cards/IngredientsCards";
import BuddyDropdown from "@/components/ui/dropdowns/BuddyDropdown";
import IngredientsContext from "@/contexts/IngredientsContext";
import MyIngredientsFilter from "@/types/MyIngredientsFilter";
import { RootStackParamList } from "@/types/RootStackParamList";
import hasMissingValues from "@/utils/hasMissingValues";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "MyIngredient">;

export default function MyIngredientsScreen({ navigation }: Props) {
  const [filter, setFIlter] = useState<MyIngredientsFilter>("");
  const { ingredients, editingIngredient, setEditingIngredient } = useContext(IngredientsContext);
  const [filteredIngredients, setFilterIngredients] = useState(ingredients);
  const [search, setSearch] = useState('')

  const searchedFilteredIngredients = useMemo(() => {
    return filteredIngredients.filter(ingredient => !search || ingredient.name.toLowerCase().includes(search.toLowerCase()))
  }, [search,filteredIngredients])

  const handlefIlter = (value: MyIngredientsFilter) => {
    if (value === "Missing values") {
      setFilterIngredients(
        ingredients.filter((ingredient) => hasMissingValues(ingredient))
      );
    } else if (value === 'Location: Fridge') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.location === 'Fridge')
      );
    } else if (value === 'Location: Pantry') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.location === 'Pantry')
      );
    } else if (value === 'Location: Freezer') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.location === 'Freezer')
      );
    } else if (value === 'Category: Dairy') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.category === 'Dairy')
      );
    } else if (value === 'Category: Fish') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.category === 'Fish')
      );
    } else if (value === 'Category: Fruit') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.category === 'Fruit')
      );
    } else if (value === 'Category: Liquid') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.category === 'Liquid')
      );
    } else if (value === 'Category: Meat') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.category === 'Meat')
      );
    } else if (value === 'Category: Vegetable') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.category === 'Vegetable')
      );
    } else if (value === 'Confection type: Canned') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.confectionType === 'Canned')
      );
    } else if (value === 'Confection type: Cured') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.confectionType === 'Cured')
      );
    } else if (value === 'Confection type: Fresh') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.confectionType === 'Fresh')
      );
    } else if (value === 'Confection type: Frozen') {
      setFilterIngredients(
        ingredients.filter((ingredient) => ingredient.confectionType === 'Frozen')
      );
    }
    else {
      setFilterIngredients(ingredients);
    }
  };

  useEffect(() => {
    setFilterIngredients(ingredients)
  }, [ingredients])

  const getIngredients = async () => {
    let deviceIngredients = await AsyncStorage.getItem('ingredients')
    if (deviceIngredients) {
      console.log('deviceIngredients', deviceIngredients)
      setFilterIngredients(JSON.parse(deviceIngredients))
    } else {
      Alert.alert("Errore while getting ingredients from device");
    }
  }

  useFocusEffect(() => {
    if (editingIngredient) {
      console.log('here!')
      getIngredients()
      setEditingIngredient(false)
    }
  })

  return (
    <SafeAreaView style={{ paddingHorizontal: 25, backgroundColor: '#9f64648d', flex: 1 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 700,
          textAlign: "center",
          marginVertical: 5,
          marginBottom: 5,
          borderColor: "black",
          borderWidth: 2,
          borderRadius: 18,
          marginLeft: 50,
          marginRight: 50,
          backgroundColor: "#4d194db5",
        }}
      >
        My Ingredients
      </Text>
      <View
        style={{
          backgroundColor: "#a16e6e8d",
          borderWidth: 1,
          borderColor: "black",
          padding: 10,
          borderRadius: 16,
          marginVertical: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{}}>Search: </Text>
        <TextInput
          placeholder="Search ingredient..."
          placeholderTextColor={"black"}
          selectionColor={"purple"}
          clearButtonMode="while-editing"
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={[styles.AddScreenTextInput, { marginBottom: 10 }]}
        />
        <Text style={{}}>Filter: </Text>
        <BuddyDropdown
          data={[
            { label: <Text style={{ fontStyle: "italic" }}>No filter</Text>, value: "" },
            { label: "Missing values", value: "Missing values" },
            { label: "Location: Fridge", value: "Location: Fridge" },
            { label: "Location: Freezer", value: "Location: Freezer" },
            { label: "Location: Pantry", value: "Location: Pantry" },
            { label: "Category: Fruit", value: "Category: Fruit" },
            { label: "Category: Vegetable", value: "Category: Vegetable" },
            { label: "Category: Dairy", value: "Category: Dairy" },
            { label: "Category: Fish", value: "Category: Fish" },
            { label: "Category: Meat", value: "Category: Meat" },
            { label: "Category: Liquid", value: "Category: Liquid" },
            { label: "Confection type: Fresh", value: "Confection type: Fresh" },
            { label: "Confection type: Canned", value: "Confection type: Canned" },
            { label: "Confection type: Frozen", value: "Confection type: Frozen" },
            { label: "Confection type: Cured", value: "Confection type: Cured" },
          ]}
          placeholder="Select a filter..."
          onSelect={handlefIlter}
          itemSelected={filter}
          setItemSelected={setFIlter}
        />
      </View>
      <ScrollView>
        {!searchedFilteredIngredients || searchedFilteredIngredients?.length === 0 ? (
          <Text>There are NO INGREDIENTS!</Text>
        ) : (
          <IngredientsCards ingredients={searchedFilteredIngredients} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({


  AddScreenTextInput: {
    backgroundColor: "#ffffffb7",
    marginTop: 5,
    minWidth: "100%",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    width: 200,
    height: 48,
    color: "black",
  },
});

