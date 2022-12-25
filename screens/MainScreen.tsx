import { StyleSheet } from "react-native";
import { Link } from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import { ROUTES } from "../constants/Routes";
import React from "react";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать!</Text>
      <View style={styles.separator} lightColor="#eee" />
      <Link to={{ screen: ROUTES.TASKS }} style={styles.linkText}>
        Перейти к событиям
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
