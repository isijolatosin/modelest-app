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
import { color } from "../constants/colors";

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
              options={{
                headerShown: true,
                title: "Shop",
                headerStyle: {
                  backgroundColor: color.darkgrey,
                },
                headerTintColor: color.gold,
                headerTitleStyle: {
                  fontWeight: "300",
                },
              }}
              name="Shop-Screen"
              component={ShopScreen}
            />
            <Stack.Screen name="Single-Screen" component={SingleScreen} />
            <Stack.Screen
              options={{
                headerShown: true,
                title: "Shopping Cart",
                headerStyle: {
                  backgroundColor: color.darkgrey,
                },
                headerTintColor: color.gold,
                headerTitleStyle: {
                  fontWeight: "300",
                },
              }}
              name="Cart-Screen"
              component={CartScreen}
            />
            <Stack.Screen
              name="Virgin-wigs-Screen"
              component={VirginWigsScreen}
            />
            {storedCredentials ? (
              <>
                <Stack.Screen
                  options={{
                    headerShown: true,
                    title: "Payment",
                    headerStyle: {
                      backgroundColor: color.darkgrey,
                    },
                    headerTintColor: color.gold,
                    headerTitleStyle: {
                      fontWeight: "300",
                    },
                  }}
                  name="Payment-Screen"
                  component={PaymentScreen}
                />
                <Stack.Screen
                  options={{
                    headerShown: true,
                    title: "Your Profile",
                    headerStyle: {
                      backgroundColor: color.darkgrey,
                    },
                    headerTintColor: color.gold,
                    headerTitleStyle: {
                      fontWeight: "300",
                    },
                  }}
                  name="Profile-Screen"
                  component={ProfileScreen}
                />
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
