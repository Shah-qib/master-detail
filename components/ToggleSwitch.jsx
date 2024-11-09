import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Colors for the app
import { Colors } from "../constants/Colors";

const ToggleSwitch = ({ viewType, setViewType }) => (
  <View style={styles.toggleContainer}>
    <TouchableOpacity
      style={[styles.toggleButton, viewType === "list" && styles.activeToggle]}
      onPress={() => setViewType("list")}
    >
      <Ionicons
        name="list-outline"
        size={20}
        color={viewType === "list" ? Colors.icon : Colors.red} // White when active, red when inactive
      />
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.toggleButton, viewType === "grid" && styles.activeToggle]}
      onPress={() => setViewType("grid")}
    >
      <Ionicons
        name="grid-outline"
        size={20}
        color={viewType === "grid" ? Colors.icon : Colors.red} // White when active, red when inactive
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: Colors.red,
    borderRadius: 5,
    width: 100,
    overFlow: "hidden",
  },
  toggleButton: {
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    borderRadius: 4,
  },
  activeToggle: {
    backgroundColor: Colors.red,
  },
});

export default ToggleSwitch;
