import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Color for the app
import { Colors } from "../constants/Colors";

const ListCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("details", { movie });
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
        <Text style={styles.title}>{movie.trackName}</Text>
        <Text style={styles.genre}>{movie.primaryGenreName}</Text>
        <Text style={styles.price}>
          {movie.collectionPrice ? `$${movie.collectionPrice}` : "N/A"}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onToggleFavorite(movie)}>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={24}
          color={isFavorite ? Colors.red : Colors.icon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    backgroundColor: Colors.card,
    borderRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  genre: {
    fontSize: 14,
    color: Colors.gray,
  },
  price: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 5,
  },
});

export default ListCard;
