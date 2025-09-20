import IngredientsContext from "@/contexts/IngredientsContext";
import BarcodeScreen from "@/screens/BarcodeScreen";
import EditScreen from "@/screens/EditScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import TabsScreen from "../screens/Tabs";

const Stack = createStackNavigator();

export default function App() {
  const [ingredients, setIngredients] = useState([])
  const [editingIngredient, setEditingIngredient] = useState(false)

  return (
    <IngredientsContext.Provider value={{ ingredients, setIngredients, editingIngredient, setEditingIngredient }}>
      <Stack.Navigator>
        <Stack.Screen
          name="TabsScreen"
          component={TabsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BarcodeScreen"
          component={BarcodeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </IngredientsContext.Provider>

  );
}
