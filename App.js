import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/Screens/HomeScreen";
import ShopScreen from "./src/Screens/ShopScreen";
import SingleScreen from "./src/Screens/SingleScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import CartScreen from "./src/Screens/CartScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
            <Stack.Screen name="Profile-Screen" component={ProfileScreen} />
            <Stack.Screen name="Cart-Screen" component={CartScreen} />
            <Stack.Screen name="Login-Screen" component={LoginScreen} />
            <Stack.Screen name="Register-Screen" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
