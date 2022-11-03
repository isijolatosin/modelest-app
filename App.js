import "react-native-gesture-handler";
import React from "react";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./src/components/CredentialsContext";
import RootStack from "./src/navigators/RootStack";
import { store, persistor } from "./store";
import { Text } from "react-native";

const App = () => {
  const [appReady, setAppReady] = React.useState(false);
  const [storedCredentials, setStoredCredentials] = React.useState("");

  const checkLoginCredentials = () => {
    AsyncStorage.getItem("modelestCredentials")
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((err) => console.log(err));
  };

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <CredentialsContext.Provider
          value={{ storedCredentials, setStoredCredentials }}
        >
          <RootStack />
        </CredentialsContext.Provider>
      </PersistGate>
    </Provider>
  );
};

export default App;
