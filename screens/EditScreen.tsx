import BuddyButton from "@/components/ui/buttons/BuddyButton";
import BuddyDropdown from "@/components/ui/dropdowns/BuddyDropdown";
import IngredientsContext from "@/contexts/IngredientsContext";
import Ingredient, {
  IngredientCategory,
  IngredientConfectionType,
  IngredientExpirationEstimate,
  IngredientLocation,
  IngredientRipeness,
} from "@/types/Ingredient";
import { RootStackParamList } from "@/types/RootStackParamList";
import { calculateExpirationDateFromEstimate, calculatePlusTimeForEstimate } from "@/utils/isExpiringInNhours";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView, Switch } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = NativeStackScreenProps<RootStackParamList, "EditScreen">;

export default function EditScreen({ navigation, route }: Props) {
  const DEFAULT_INGREDIENT: Ingredient = {
    id: 1,
    name: "",
    category: "",
    location: "",
    confectionType: "",
    expirationEstimate: "",
    expirationDate: new Date(),
    open: false,
    ripenessChecked: true,
    whenChecked: new Date()
  };

  const { ingredientToEdit, scanned = false } = route?.params ?? {};

  const [ingredient, setIngredient] = useState<Ingredient>(ingredientToEdit);
  const [categorySelected, setCategorySelected] = useState("");
  const [locationSelected, setLocationSelected] = useState("");
  const [confectionTypeSelected, setConfectionTypeSelected] = useState("");
  const [estimationSelected, setEstimationSelected] = useState("");
  const [ripenessTypeSelected, setRipenessTypeSelected] = useState("");
  const [date, setDate] = useState(new Date(ingredient?.expirationDate));

  const { setIngredients } = useContext(IngredientsContext);

  useEffect(() => {
    setCategorySelected(ingredient?.category);
    setLocationSelected(ingredient?.location);
    setConfectionTypeSelected(ingredient?.confectionType);
    setEstimationSelected(ingredient?.expirationEstimate);
    setRipenessTypeSelected(ingredient?.ripeness);
  }, [ingredient]);

  useEffect(() => {
    const now = new Date()
    if (ingredient.ripeness && (now.getTime() - new Date(ingredient.whenChecked).getTime() >= 3 * 24 * 60 * 60 * 1000)) {
      setIngredient({ ...ingredient, ripenessChecked: false, whenChecked: new Date() })
      Alert.alert("Ripeness check", "Check the ingredient's Ripeness!")
    }

  }, [])

  const handleEdit = async () => {
    if (!ingredient?.name) {
      Alert.alert("Name is mandatory", "Insert the ingredient name and retry.");
      return;
    }

    let deviceIngredients = await AsyncStorage.getItem("ingredients");
    let ingredients: Ingredient[] = [];

    if (!deviceIngredients) {
      ingredients = [ingredient];
    } else {
      ingredients = JSON.parse(deviceIngredients);
      if (ingredients.length !== 0) {
        let index = -1;
        for (let i = 0; i < ingredients.length; i++) {
          if (ingredients[i].id === ingredient.id) {
            index = i;
            break;
          }
        }

        if (scanned) {
          ingredients.push(ingredient);
          index = ingredients.length - 1;
        } else if (index === -1) {
          Alert.alert("Error while editing ingredient. Going back.");
          navigation.goBack();
          return;
        }

        ingredients[index] = ingredient;
      } else {
        ingredients = [ingredient];
      }
    }

    await AsyncStorage.setItem("ingredients", JSON.stringify(ingredients));
    setIngredients(ingredients);

    handleReset();
    if (scanned) {
      navigation?.reset({
        index: 0,
        routes: [
          {
            name: "TabsScreen",
            params: {},
            state: {
              routes: [{ name: "My Ingredients", params: {} }],
            },
          },
        ],
      });
    } else {
      navigation.goBack();
    }
  };

  const handleReset = async () => {
    setIngredient(DEFAULT_INGREDIENT);
    setDate(new Date());
    setCategorySelected("");
    setLocationSelected("");
    setConfectionTypeSelected("");
    setEstimationSelected("");
  };

  return (
    <SafeAreaView
      style={{ paddingHorizontal: 10, backgroundColor: "#9f64648d" }}
    >
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={35}
              color="#4d194db5"
            ></Ionicons>
          </TouchableOpacity>
        </View>

        <View>
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
            Edit Ingredient
          </Text>
        </View>

        <Text>
          Ingredient name<Text style={{ color: "red" }}>*</Text>:
        </Text>
        <TextInput
          placeholder="e.g. Carrot, Milk, Chicken..."
          placeholderTextColor={"black"}
          selectionColor={"purple"}
          clearButtonMode="always"
          value={ingredient?.name}
          onChangeText={(text) => setIngredient({ ...ingredient, name: text })}
          style={[styles.EditScreenTextInput, { marginBottom: 10 }]}
        />
        <Text>Ingredient brand:</Text>
        <TextInput
          placeholder="e.g. Barilla, Mutti, Lavazza..."
          placeholderTextColor={"black"}
          selectionColor={"purple"}
          clearButtonMode="always"
          value={ingredient?.brand}
          onChangeText={(text) => setIngredient({ ...ingredient, brand: text })}
          style={[styles.EditScreenTextInput, { marginBottom: 10 }]}
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
          onSelect={(value: IngredientCategory) =>
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
          onSelect={(value: IngredientConfectionType) => {
            const previous = ingredient.confectionType
            if (previous === 'Fresh' && value === 'Frozen') {
              let expirationDate = ingredient.expirationDate
              if (ingredient.expirationEstimate) {
                const plusTime = calculatePlusTimeForEstimate(ingredient)
                expirationDate = calculateExpirationDateFromEstimate(new Date(ingredient.createdAt), plusTime)
              }
              setIngredient({
                ...ingredient,
                confectionType: value,
                expirationDate: (() => {
                  const date = expirationDate ? new Date(expirationDate) : new Date()
                  date.setMonth(date.getMonth() + 6);
                  return date;
                })(),
              });
            } else {
              setIngredient({ ...ingredient, confectionType: value })
            }

          }}
          placeholder="Select a confection type..."
        />

        {ingredient.ripeness && <Text style={{ textAlign: 'right', marginTop: 6 }}>Ripeness check:</Text>}
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, maxWidth: ingredient.ripeness ? 270 : '100%' }}>
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
          </View>
          {
            ingredient.ripeness && (
              <View style={{ flexDirection: "row", gap: 10, alignItems: "center", marginBottom: 15, marginTop: 10, marginRight: 30 }}>
                <Switch
                  trackColor={{ true: '#4d194db5', false: 'grey' }}
                  value={ingredient.ripenessChecked}
                  onValueChange={(value) =>
                    setIngredient({ ...ingredient, ripenessChecked: value })
                  }
                />
              </View>
            )
          }
        </View>

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text
            style={{
              fontWeight: 600,
            }}
          >
            Unopened
          </Text>
          <Switch
            trackColor={{ true: '#4d194db5', false: 'grey' }}
            value={ingredient.open}
            onValueChange={(value) =>
              setIngredient({ ...ingredient, open: value })
            }
          />
          <Text
            style={{
              fontWeight: 600,
            }}
          >
            Open
          </Text>
        </View>

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
        {ingredient?.expirationEstimate !== "" ? (
          <Text style={{ fontStyle: "italic" }}>
            (Deselect expiration estimate to choose a specific date)
          </Text>
        ) : (
          <DateTimePicker
            accentColor="#4d194db5"
            textColor="#4d194db5"
            mode="date"
            value={date}
            onChange={(event, selectedDate) => {
              if (event.type === "set" && selectedDate) {
                setIngredient({
                  ...ingredient,
                  expirationDate: selectedDate,
                  expirationEstimate: "",
                });
                setDate(date);
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
            text="Save"
            borderColor="#007e00ce"
            onPress={handleEdit}
            onPressBgColor="#007e00ce"
          />
        </View>
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
  EditScreenText: {
    color: "black",
    fontFamily: "Asimovian",
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  EditScreenPressable: {
    backgroundColor: "pink",
    borderColor: "purple",
    padding: 15,
    borderRadius: 8,
    borderWidth: 3,
    width: 200,
    height: 50,
  },
  EditScreenTextInput: {
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
