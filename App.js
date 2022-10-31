import "react-native-gesture-handler";
import React from "react";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./src/components/CredentialsContext";
import RootStack from "./src/navigators/RootStack";

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
    <CredentialsContext.Provider
      value={{ storedCredentials, setStoredCredentials }}
    >
      <RootStack />
    </CredentialsContext.Provider>
  );
};

export default App;
