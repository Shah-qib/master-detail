import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

// Colors for the app
import { Colors } from "../constants/Colors";

const Favorites = ({ favorites }) => {
  const navigation = useNavigation();

  // Function to truncate text to a specific number of words
  const truncateTitle = (title, maxWords) => {
    const words = title.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " (...)";
    }
    return title;
  };

  const handlePress = (item) => {
    // Navigate to the Details screen and pass the movie item as a parameter
    navigation.navigate("details", { movie: item });
  };

  if (favorites.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.genreTitle}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            style={styles.movieContainer}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: item.artworkUrl100 }}
                placeholder={require("../assets/images/placeholder.png")} // Local placeholder image
                contentFit="fill"
                transition={200}
              />
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {truncateTitle(item.trackName, 15)}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  genreTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.text,
    marginLeft: 10,
  },
  movieContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 3,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: Colors.red,
    borderWidth: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    maxWidth: 100,
    color: Colors.text,
  },
});

export default Favorites;
