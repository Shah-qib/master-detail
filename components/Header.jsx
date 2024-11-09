// components/Header.js
import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Colors for the app
import { Colors } from "../constants/Colors";

const Header = ({ toggleModal }) => (
  <View style={styles.header}>
    <Image
      source={require("../assets/images/MD.jpg")}
      style={styles.image}
      resizeMode="contain"
    />

    <TouchableOpacity onPress={toggleModal}>
      <Ionicons name="search" size={28} color={Colors.icon} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 2,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default Header;
