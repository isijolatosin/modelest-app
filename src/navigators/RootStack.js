import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CredentialsContext } from "../components/CredentialsContext";
import HomeScreen from "../Screens/HomeScreen";
import ShopScreen from "../Screens/ShopScreen";
import SingleScreen from "../Screens/SingleScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import CartScreen from "../Screens/CartScreen";
import PaymentScreen from "../Screens/PaymentScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import VirginWigsScreen from "../Screens/VirginWigsScreen";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            keyboardHandlingEnabled={true}
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Home-Screen"
          >
            <Stack.Screen
              name="Home-Screen"
              //  options={{ title: "Welcome" }}
              //  options={{ headerShown: false }}
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: true, title: "Shop" }}
              name="Shop-Screen"
              component={ShopScreen}
            />
            <Stack.Screen name="Single-Screen" component={SingleScreen} />
            <Stack.Screen name="Cart-Screen" component={CartScreen} />
            <Stack.Screen name="Payment-Screen" component={PaymentScreen} />
            <Stack.Screen
              name="Virgin-wigs-Screen"
              component={VirginWigsScreen}
            />
            {storedCredentials ? (
              <>
                <Stack.Screen name="Profile-Screen" component={ProfileScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login-Screen" component={LoginScreen} />
                <Stack.Screen
                  name="Register-Screen"
                  component={RegisterScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
