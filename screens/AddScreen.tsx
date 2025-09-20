import BuddyButton from "@/components/ui/buttons/BuddyButton";
import BuddyDropdown from "@/components/ui/dropdowns/BuddyDropdown";
import IngredientsContext from "@/contexts/IngredientsContext";
import useIngredientsFromDevice from "@/hooks/storage/useIngredientsFromDevice";
import Ingredient, {
  IngredientConfectionType,
  IngredientExpirationEstimate,
  IngredientLocation,
  IngredientRipeness,
} from "@/types/Ingredient";
import { RootStackParamList } from "@/types/RootStackParamList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = NativeStackScreenProps<RootStackParamList, "AddScreen">;

export default function AddScreen({ navigation }: Props) {
  const DEFAULT_INGREDIENT: Ingredient = {
    id: 1,
    name: "",
    category: "",
    location: "",
    confectionType: "",
    expirationEstimate: "",
    expirationDate: new Date(),
    open: false,
    createdAt: new Date(),
    ripeness: "",
    brand: "",
    ripenessChecked: true,
    whenChecked: new Date()
  };

  const [ingredient, setIngredient] = useState<Ingredient>(DEFAULT_INGREDIENT);
  const [categorySelected, setCategorySelected] = useState("");
  const [locationSelected, setLocationSelected] = useState("");
  const [confectionTypeSelected, setConfectionTypeSelected] = useState("");
  const [ripenessTypeSelected, setRipenessTypeSelected] = useState("");
  const [estimationSelected, setEstimationSelected] = useState("");
  const { setIngredients } = useContext(IngredientsContext);
  useIngredientsFromDevice();

  const handleReset = async () => {
    setIngredient(DEFAULT_INGREDIENT);
    setCategorySelected("");
    setLocationSelected("");
    setConfectionTypeSelected("");
    setRipenessTypeSelected("");
    setEstimationSelected("");
  };

  const handleAdd = async () => {
    if (!ingredient.name) {
      Alert.alert("Name is mandatory", "Insert the ingredient name and retry.");
      return;
    }

    let deviceIngredients = await AsyncStorage.getItem("ingredients");
    let ingredients: Ingredient[] = [];

    if (!deviceIngredients) {
      ingredients = [ingredient];
    } else {
      ingredients = JSON.parse(deviceIngredients);
      let nextId = 0;
      if (ingredients.length !== 0) {
        nextId = ingredients[ingredients.length - 1].id + 1;
      }
      ingredient.id = nextId;
      ingredients.push(ingredient);
    }

    await AsyncStorage.setItem("ingredients", JSON.stringify(ingredients));

    setIngredients(ingredients);

    handleReset();
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#9f64648d" }}>
      <ScrollView style={{ paddingHorizontal: 10 }}>
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
          Add a new ingredient
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("BarcodeScreen")}
          style={{
            flexDirection: "row",
            marginBottom: 5,
            justifyContent: "flex-end",
          }}
        >
          <Ionicons name="barcode-sharp" size={35} color="black" backgroundColor= "#ffffffff" borderRadius={4} borderWidth={1}></Ionicons>
        </TouchableOpacity>
        <Text>
          Ingredient name<Text style={{ color: "red" }}>*</Text>:
        </Text>
        <TextInput
          placeholder="e.g. Carrot, Milk, Chicken..."
          placeholderTextColor={"black"}
          selectionColor={"purple"}
          clearButtonMode="always"
          value={ingredient.name}
          onChangeText={(text) => setIngredient({ ...ingredient, name: text })}
          style={[styles.AddScreenTextInput, { marginBottom: 10 }]}
        />
        <Text>Ingredient brand:</Text>
        <TextInput
          placeholder="e.g. Barilla, Mutti, Lavazza..."
          placeholderTextColor={"black"}
          selectionColor={"purple"}
          clearButtonMode="always"
          value={ingredient.brand}
          onChangeText={(text) => setIngredient({ ...ingredient, brand: text })}
          style={[styles.AddScreenTextInput, { marginBottom: 10 }]}
        />
        <BuddyDropdown
          data={[
            {
              label: <Text style={{ fontStyle: "italic" }}>None</Text>,
              value: "",
            },
            { label: "Fruit", value: "Fruit" },
            { label: "Vegetable", value: "Vegetable" },
            { label: "Dairy", value: "Dairy" },
            { label: "Fish", value: "Fish" },
            { label: "Meat", value: "Meat" },
            { label: "Liquid", value: "Liquid" },
          ]}
          itemSelected={categorySelected}
          setItemSelected={setCategorySelected}
          onSelect={(value: any) =>
            setIngredient({ ...ingredient, category: value })
          }
          placeholder="Select a category..."
        />

        <BuddyDropdown
          data={[
            {
              label: <Text style={{ fontStyle: "italic" }}>None</Text>,
              value: "",
            },
            { label: "Fridge", value: "Fridge" },
            { label: "Freezer", value: "Freezer" },
            { label: "Pantry", value: "Pantry" },
          ]}
          itemSelected={locationSelected}
          setItemSelected={setLocationSelected}
          onSelect={(value: IngredientLocation) =>
            setIngredient({ ...ingredient, location: value })
          }
          placeholder="Select a location..."
        />

        <BuddyDropdown
          data={[
            {
              label: <Text style={{ fontStyle: "italic" }}>None</Text>,
              value: "",
            },
            { label: "Fresh", value: "Fresh" },
            { label: "Canned", value: "Canned" },
            { label: "Frozen", value: "Frozen" },
            { label: "Cured", value: "Cured" },
          ]}
          itemSelected={confectionTypeSelected}
          setItemSelected={setConfectionTypeSelected}
          onSelect={(value: IngredientConfectionType) =>
            setIngredient({ ...ingredient, confectionType: value })
          }
          placeholder="Select a confection type..."
        />

        <BuddyDropdown
          data={[
            {
              label: <Text style={{ fontStyle: "italic" }}>None</Text>,
              value: "",
            },
            { label: "Green", value: "Green" },
            { label: "Ripe", value: "Ripe" },
            { label: "Advanced", value: "Advanced" },
            { label: "Too ripe", value: "Too ripe" },
          ]}
          itemSelected={ripenessTypeSelected}
          setItemSelected={setRipenessTypeSelected}
          onSelect={(value: IngredientRipeness) =>
            setIngredient({ ...ingredient, ripeness: value })
          }
          placeholder="Select a ripeness status..."
        />

        <Text
          style={{
            fontWeight: 600,
            textAlign: "center",
            marginTop: 20,
            marginBottom: 5,
          }}
        >
          EXPIRATION DATE
        </Text>
        <BuddyDropdown
          data={[
            {
              label: <Text style={{ fontStyle: "italic" }}>None</Text>,
              value: "",
            },
            { label: "1 week from now", value: "1 week from now" },
            { label: "10 days from now", value: "10 days from now" },
            { label: "1 month from now", value: "1 month from now" },
          ]}
          itemSelected={estimationSelected}
          setItemSelected={setEstimationSelected}
          onSelect={(value: IngredientExpirationEstimate) =>
            setIngredient({ ...ingredient, expirationEstimate: value })
          }
          placeholder="Select an estimation..."
        />

        <Text
          style={{
            fontStyle: "italic",
            textAlign: "center",
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          otherwise
        </Text>

        <Text style={styles.label}>
          Select a <Text style={{ fontWeight: "bold" }}>specific</Text>{" "}
          expiration date:
        </Text>
        {ingredient.expirationEstimate !== "" ? (
          <Text style={{ fontStyle: "italic" }}>
            (Deselect expiration estimate to choose a specific date)
          </Text>
        ) : (
          <DateTimePicker
            accentColor="#4d194db5"
            textColor="#4d194db5"
            mode="date"
            value={ingredient.expirationDate}
            onChange={(event, selectedDate) => {
              if (event.type === "set" && selectedDate) {
                setIngredient({
                  ...ingredient,
                  expirationDate: selectedDate,
                  expirationEstimate: "",
                });
              }
            }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BuddyButton
            text="Reset"
            borderColor="#a50000ba"
            onPress={handleReset}
            onPressBgColor="#a50000ba"
          />
          <BuddyButton
            text="Add"
            borderColor="#007e00ce"
            onPress={handleAdd}
            onPressBgColor="#007e00ce"
          />
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            textAlign: "center",
            marginVertical: 15,
            marginBottom: 5,
            borderColor: "black",
            borderWidth: 2,
            borderLeftWidth: 4,
            borderRightWidth: 4,
            borderRadius: 18,
            marginLeft: 110,
            marginRight: 110,
            backgroundColor: "#e36600ff",
            fontStyle: "italic",
          }}
        >
          Leo&apos;s Kitchen Buddy
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

{
  /* <style>
  @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
  </style> */
}

const styles = StyleSheet.create({
  AddScreenText: {
    color: "black",
    fontFamily: "Asimovian",
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  AddScreenPressable: {
    backgroundColor: "pink",
    borderColor: "purple",
    padding: 15,
    borderRadius: 8,
    borderWidth: 3,
    width: 200,
    height: 50,
  },
  AddScreenTextInput: {
    backgroundColor: "#ffffffb7",
    marginTop: 5,
    minWidth: "100%",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1.5,
    width: 200,
    height: 50,
    color: "black",
  },
});
