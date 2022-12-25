import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <Provider store={store}>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar />
          </SafeAreaProvider>
        </Provider>
      </NativeBaseProvider>
    );
  }
}
