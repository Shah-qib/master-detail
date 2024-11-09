import React from "react";
import { FlatList, ScrollView, View, Text, StyleSheet } from "react-native";
import ListCard from "./ListCard";
import GridCard from "./GridCard";

// Colors for the app
import { Colors } from "../constants/Colors";

const MovieList = React.memo(
  ({ movies, viewType, isFavorite, onToggleFavorite }) => {
    return viewType === "list" ? (
      <>
        <Text style={styles.genreTitle}>All Movies</Text>
        <FlatList
          data={movies.flatMap((genre) => genre.movies)} // Flatten the movies for list view
          keyExtractor={(item) => item.trackId.toString()}
          renderItem={({ item }) => (
            <ListCard
              movie={item}
              isFavorite={isFavorite(item.trackId)}
              onToggleFavorite={onToggleFavorite}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No movies found.</Text>
          }
          keyboardShouldPersistTaps="handled"
        />
      </>
    ) : (
      <ScrollView>
        {movies.map((genre, index) => (
          <View key={index} style={styles.genreSection}>
            <Text style={styles.genreTitle}>{genre.genre}</Text>
            <FlatList
              data={genre.movies}
              keyExtractor={(item) => item.trackId.toString()}
              renderItem={({ item }) => (
                <GridCard
                  movie={item}
                  isFavorite={isFavorite(item.trackId)}
                  onToggleFavorite={onToggleFavorite}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))}
      </ScrollView>
    );
  }
);

const styles = StyleSheet.create({
  genreSection: {
    marginBottom: 15,
  },
  genreTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
    color: Colors.text,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.gray,
  },
});

export default MovieList;
