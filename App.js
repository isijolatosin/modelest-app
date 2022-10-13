import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/Screens/HomeScreen";
import ShopScreen from "./src/Screens/ShopScreen";
import SingleScreen from "./src/Screens/SingleScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        keyboardHandlingEnabled={true}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          //  options={{ headerShown: false }}
          name="Home-Screen"
          component={HomeScreen}
          //  options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Shop-Screen" component={ShopScreen} />
        <Stack.Screen name="Single-Screen" component={SingleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
