import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { ROUTES } from "../constants/Routes";
import { RootStackScreenProps } from "../types";

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Экран не найден</Text>
      <TouchableOpacity
        onPress={() => navigation.replace(ROUTES.MAIN)}
        style={styles.link}
      >
        <Text style={styles.linkText}>Перейти на главный экран</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
