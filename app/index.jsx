import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/slices/moviesSlice";
import { setSearchTerm } from "../redux/slices/viewSlice";
import { toggleFavorite, saveFavorites } from "../redux/slices/favoritesSlice";

// Components
import Header from "../components/Header";
import LastVisited from "../components/LastVisited";
import Favorites from "@/components/Favorites";
import ToggleSwitch from "../components/ToggleSwitch";
import MovieList from "../components/MovieList";
import SearchModal from "../components/SearchModal";

// Colors for the app
import { Colors } from "../constants/Colors";

// Constants
const LAST_VISITED_KEY = "lastVisitedDate";

const Index = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [searchResults, setSearchResults] = useState([]);
  const [lastVisitedDate, setLastVisitedDate] = useState(null);

  // Redux state selectors
  const { moviesList, loading, error } = useSelector((state) => state.movies);
  const { searchTerm } = useSelector((state) => state.view);
  const favoriteMovies = useSelector((state) => state.favorites.favoriteMovies);

  useEffect(() => {
    dispatch(fetchMovies("star"));
    const fetchLastVisitedDate = async () => {
      try {
        const savedDate = await AsyncStorage.getItem(LAST_VISITED_KEY);
        if (savedDate) {
          setLastVisitedDate(new Date(savedDate));
        }
      } catch (error) {
        console.log("Error fetching last visited date:", error);
      }
    };

    fetchLastVisitedDate();
    const currentDate = new Date();
    AsyncStorage.setItem(LAST_VISITED_KEY, currentDate.toISOString()).catch(
      (error) => console.log("Error saving last visited date:", error)
    );
  }, [dispatch]);

  const handleSearch = (text) => {
    dispatch(setSearchTerm(text));
    if (text) {
      const results = moviesList.filter((movie) =>
        movie.trackName.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const groupedMoviesByGenre = () => {
    const grouped = moviesList.reduce((acc, movie) => {
      const genre = movie.primaryGenreName || "Other";
      if (!acc[genre]) acc[genre] = [];
      acc[genre].push(movie);
      return acc;
    }, {});

    return Object.keys(grouped).map((genre) => ({
      genre,
      movies: grouped[genre],
    }));
  };

  const moviesByGenre = groupedMoviesByGenre();

  const isFavorite = (movieId) => {
    return favoriteMovies.some((favMovie) => favMovie.trackId === movieId);
  };

  const handleToggleFavorite = (movie) => {
    dispatch(toggleFavorite(movie));
    const updatedFavorites = [...favoriteMovies];
    const index = updatedFavorites.findIndex(
      (fav) => fav.trackId === movie.trackId
    );
    if (index >= 0) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(movie);
    }
    dispatch(saveFavorites(updatedFavorites));
  };

  // Combine both favorites and movies into a single data array
  const combinedData = [
    { type: "favorites", data: favoriteMovies },
    { type: "movies", data: moviesByGenre },
  ];

  const renderItem = useCallback(
    ({ item }) => {
      if (item.type === "favorites") {
        return <Favorites favorites={item.data} />;
      }
      return (
        <MovieList
          movies={item.data}
          viewType={viewType}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    },
    [viewType, favoriteMovies]
  );

  return (
    <View style={styles.container}>
      <Header toggleModal={toggleModal} />
      <View style={styles.headerContainer}>
        <LastVisited date={lastVisitedDate} />
        <ToggleSwitch viewType={viewType} setViewType={setViewType} />
      </View>

      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />

      <SearchModal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        loading={loading}
        error={error}
        searchResults={searchResults}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
});

export default Index;
