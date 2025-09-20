import IngredientsContext from "@/contexts/IngredientsContext";
import Ingredient from "@/types/Ingredient";
import formatDatetime from "@/utils/formatDatetime";
import { calculateExpirationDateFromEstimate, calculatePlusTimeForEstimate } from "@/utils/isExpiringInNhours";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type IngredientCardProps = {
  ingredient: Ingredient;
};

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient }) => {
  const { ingredients, setIngredients, setEditingIngredient } =
    useContext(IngredientsContext);
  const navigation = useNavigation();

  const date = useMemo(() => {
    return formatDatetime(ingredient.expirationDate);
  }, [ingredient]);

  const onEditIngredient = () => {
    setEditingIngredient(true);
    navigation.navigate("EditScreen", { ingredientToEdit: ingredient });
  };

  const onDeleteIngredient = async () => {
    const newIngredients = ingredients.filter(
      (elem) => elem.id !== ingredient.id
    );
    setIngredients(newIngredients);
    await AsyncStorage.setItem("ingredients", JSON.stringify(newIngredients));
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.name}>{ingredient.name}</Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <TouchableOpacity onPress={onEditIngredient}>
            <Ionicons
              name="create-outline"
              size={20}
              color="#ab1aabf4"
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteIngredient}>
            <Ionicons name="trash-outline" size={20} color="red"></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.attributeOutline}>
          {ingredient.category ? (
            <Text style={styles.attributeText}>
              Category: {ingredient.category}
            </Text>
          ) : (
            <Text style={styles.attributeText}>No category</Text>
          )}
        </View>

        <View style={styles.attributeOutline}>
          {ingredient.confectionType ? (
            <Text style={styles.attributeText}>
              Confection Type: {ingredient.confectionType}
            </Text>
          ) : (
            <Text style={styles.attributeText}>No confection type</Text>
          )}
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.attributeOutline}>
          {ingredient.brand ? (
            <Text style={styles.attributeText}>Brand: {ingredient.brand}</Text>
          ) : (
            <Text style={styles.attributeText}>No brand</Text>
          )}
        </View>

        <View style={styles.attributeOutline}>
          {ingredient.ripeness ? (
            <Text style={styles.attributeText}>
              Ripeness: {ingredient.ripeness}
            </Text>
          ) : (
            <Text style={styles.attributeText}>No ripeness status</Text>
          )}
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <View style={styles.propertyContainer}>
            <Ionicons name="location-sharp" size={20} color="black"></Ionicons>
            {ingredient.location ? (
              <Text>{ingredient.location}</Text>
            ) : (
              <Text>No location</Text>
            )}
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: "500",
              color: ingredient.open ? "#e36600ff" : "black",
            }}
          >
            {ingredient.open
              ?
              "Open" : "Unopened"}
          </Text>
          {ingredient.open && <Ionicons name="alert-circle" size={20} color='#e36600ff'></Ionicons>}
        </View>
      </View>
      {!ingredient.ripenessChecked && <Text style={{ textAlign: 'center', color: 'red', fontStyle: 'italic' }}>CHECK RIPENESS!</Text>}
      <View style={[styles.propertyContainer, { alignSelf: "center" }]}>
        <Ionicons name="hourglass-outline" size={20} color="black"></Ionicons>
        {ingredient.expirationDate || ingredient.expirationEstimate ? (
          <Text>
            {ingredient.expirationEstimate
              ? calculateExpirationDateFromEstimate(new Date(ingredient.createdAt), calculatePlusTimeForEstimate(ingredient.expirationEstimate)).toISOString().split("T")[0]
              : date}
          </Text>
        ) : (
          <Text>No expiration</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffffb7",
    padding: 10,
    borderRadius: 18,
    gap: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  name: {
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 10,
  },
  propertyContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  attributeOutline: {
    borderWidth: 1,
    borderColor: "#4d194db5",
    borderRadius: 5,
  },
  attributeText: {
    margin: 5,
  },
});

export default IngredientCard;
