import React from "react";
import {
  View,
  TextInput,
  Modal,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ListCard from "./ListCard";

// Colors for the app
import { Colors } from "../constants/Colors";

const SearchModal = ({
  isVisible,
  toggleModal,
  searchTerm,
  handleSearch,
  loading,
  error,
  searchResults,
  isFavorite,
  onToggleFavorite,
}) => (
  <Modal
    animationType="slide"
    transparent={false} // Make modal non-transparent to cover the whole screen
    visible={isVisible}
    onRequestClose={toggleModal}
  >
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
        <Ionicons name="close" size={28} color={Colors.icon} />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a movie"
          value={searchTerm}
          onChangeText={handleSearch}
          autoFocus={true}
          placeholderTextColor={Colors.gray}
        />
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color={Colors.white}
          style={styles.loader}
        />
      )}

      {error && <Text style={styles.error}>Error: {error}</Text>}

      {/* Display "Movies" label if there are search results */}
      {searchResults.length > 0 && (
        <Text style={styles.moviesLabel}>Movies:</Text>
      )}

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <ListCard
            movie={item}
            isFavorite={isFavorite(item.trackId)}
            onToggleFavorite={onToggleFavorite}
          />
        )}
        ListEmptyComponent={
          !loading && <Text style={styles.emptyText}>No movies found.</Text>
        }
        keyboardShouldPersistTaps="handled"
      />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.darkGray,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    color: Colors.white,
    flex: 1,
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 10,
  },
  loader: {
    marginVertical: 10,
    alignSelf: "center",
  },
  error: {
    color: Colors.red,
    textAlign: "center",
    marginVertical: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.gray,
  },
  moviesLabel: {
    color: Colors.white, // Adjust the color as needed
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10, // Add some space above and below the label
  },
});

export default SearchModal;