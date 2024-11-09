import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Color for the app
import { Colors } from "../constants/Colors";

const GridCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("details", { movie }); // Navigate to the details screen
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        style={styles.image}
        source={{ uri: movie.artworkUrl100 }}
        placeholder={require("../assets/images/placeholder.png")} // Local placeholder image
        contentFit="fill"
        transition={200}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.trackName}
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>
          {movie.collectionPrice ? `$${movie.collectionPrice}` : "N/A"}
        </Text>
        <TouchableOpacity onPress={() => onToggleFavorite(movie)}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? Colors.red : Colors.icon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 130,
    height: 200,
    margin: 5,
    padding: 5,
    backgroundColor: Colors.card,
    borderRadius: 4,
    justifyContent: "space-between", // Ensures footer stays at the bottom
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 2,
  },
  info: {
    flex: 1, // Allow info to take available space
    justifyContent: "flex-start", // Align title at the top
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.white,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    color: Colors.gray,
  },
});

export default GridCard;