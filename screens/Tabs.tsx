import ExpiringSoonTab from "@/tabs/ExpiringSoonTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddScreen from "./AddScreen";
import MyIngredientsScreen from "./MyIngredient";

const Tab = createBottomTabNavigator();

export default function TabsScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        
        tabBarActiveTintColor: "#d3a9d3b5",
        tabBarInactiveTintColor: "black",
        
        tabBarStyle: {
          backgroundColor: '#4d194dd7',
          borderColor: 'black',
          borderTopWidth: 1.2,
        }
      }}
      initialRouteName="Add"
    >

      <Tab.Screen
        name="My Ingredients"
        component={MyIngredientsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name="list-circle-outline"
                size={20}
                color={color}
              ></Ionicons>
            );
          },
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={color}
              ></Ionicons>
            );
          },
        }}
      />

      <Tab.Screen
        name="Expiring Soon"
        component={ExpiringSoonTab}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name="hourglass-outline"
                size={20}
                color={color}
              ></Ionicons>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
