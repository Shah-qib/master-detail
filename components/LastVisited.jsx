import React from "react";
import { Text, StyleSheet } from "react-native";

// Colors for the app
import { Colors } from "../constants/Colors";

const LastVisited = ({ date }) => {
  const formatDate = (date) => {
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return date ? (
    <Text style={styles.lastVisitedText}>Last visited: {formatDate(date)}</Text>
  ) : null;
};

const styles = StyleSheet.create({
  lastVisitedText: {
    fontSize: 14,
    color: Colors.gray,
  },
});

export default LastVisited;
