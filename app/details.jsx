import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

// colors for the app
import { Colors } from "../constants/Colors";

// Redux slices
import { toggleFavorite, saveFavorites } from "../redux/slices/favoritesSlice";

// Components
import VideoPlayer from "../components/VideoPlayer";

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { movie } = route.params;
  const dispatch = useDispatch();

  const favoriteMovies = useSelector((state) => state.favorites.favoriteMovies);

  const [isFavorited, setIsFavorited] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const favoriteCheck = favoriteMovies.some(
      (fav) => fav.trackId === movie.trackId
    );
    setIsFavorited(favoriteCheck);
  }, [favoriteMovies, movie.trackId]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleFavoritePress = () => {
    setIsFavorited(!isFavorited);
    dispatch(toggleFavorite(movie));

    const updatedFavorites = isFavorited
      ? favoriteMovies.filter((fav) => fav.trackId !== movie.trackId)
      : [...favoriteMovies, movie];

    dispatch(saveFavorites(updatedFavorites));
  };

  const handleWatchTrailerPress = () => {
    setIsVideoVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="close" size={28} color={Colors.icon} />
      </TouchableOpacity>

      <ScrollView>
        {/* Big Image */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: movie.artworkUrl100 }}
            placeholder={require("../assets/images/placeholder.png")} // Local placeholder image
            contentFit="contain"
            transition={300}
            placeholderContentFit="fit"
          />
        </View>

        {/* Watch Trailer Button */}
        <TouchableOpacity
          style={styles.watchTrailerButton}
          onPress={handleWatchTrailerPress}
        >
          <Ionicons name="play" size={24} color={Colors.black} />
          <Text style={styles.watchTrailerText}>Watch Trailer</Text>
        </TouchableOpacity>

        {/* Title and Favorite Button */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie.trackName}</Text>
          <TouchableOpacity onPress={handleFavoritePress}>
            <Ionicons
              name={isFavorited ? "heart" : "heart-outline"}
              size={30}
              color={isFavorited ? Colors.red : Colors.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Genre */}
        <Text style={styles.subTitle}>{movie.primaryGenreName}</Text>

        {/* Rating */}
        <Text style={styles.subTitle}>
          Rating: {movie.contentAdvisoryRating}
        </Text>

        {/* artistName */}
        <Text style={styles.subTitle}>Artist Name: {movie.artistName}</Text>

        {/* Release Date */}
        <Text style={styles.subTitle}>
          Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
        </Text>

        {/* Price */}
        <Text style={styles.subTitle}>
          Price: {movie.collectionPrice ? `$${movie.collectionPrice}` : "N/A"}
        </Text>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeader}>Description:</Text>
          <Text style={styles.description}>{movie.longDescription}</Text>
        </View>
      </ScrollView>

      {/* Video Player Modal */}
      <VideoPlayer
        visible={isVideoVisible}
        onClose={() => setIsVideoVisible(false)}
        videoUrl={movie.previewUrl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  imageContainer: {
    width: 130,
    height: 192,
    marginTop: 5,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  watchTrailerButton: {
    width: "100%",
    backgroundColor: Colors.white,
    paddingVertical: 6,
    marginTop: 10,
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  watchTrailerText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  subTitle: {
    fontSize: 16,
    color: Colors.gray,
  },
  descriptionContainer: {
    marginVertical: 20,
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
});

export default Details;
