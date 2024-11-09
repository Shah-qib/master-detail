// VideoPlayer.jsx
import React, { useRef, useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

const VideoPlayer = ({ visible, onClose, videoUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.stopAsync();
    }
    onClose();
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleForward = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      const newPosition = Math.min(
        status.positionMillis + 10000,
        status.durationMillis
      );
      videoRef.current.setPositionAsync(newPosition);
    }
  };

  const handleRewind = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      const newPosition = Math.max(status.positionMillis - 10000, 0);
      videoRef.current.setPositionAsync(newPosition);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay={true}
          isLooping={false}
          style={styles.video}
        />

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={handleRewind}>
            <Ionicons name="play-back" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePlayPause}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={30}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForward}>
            <Ionicons name="play-forward" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controls: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
});

export default VideoPlayer;
