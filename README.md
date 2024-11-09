# React Native Movie App

## Overview
This React Native app allows users to browse and search for movies from the iTunes API, manage favorites, and view detailed information.

## Features
- **Favorites**: Users can mark movies as favorites, with persistence offline.
- **Search Functionality**: Dynamic search bar with results and empty state handling.
- **View Options**: Toggle between list and grid layouts.
- **Movie Details**: Detailed view with descriptions and placeholder images for missing artwork.

## Tech Stack
- **React Native**: Latest version
- **State Management**: Redux
- **Local Storage**: AsyncStorage
- **Network Requests**: Axios
- **Image Loading**: expo-image

## Architecture
The app uses Redux for centralized state management, ensuring predictable state transitions and scalability.

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the app with `npx expo start`.

## License
MIT License.

## Acknowledgments
Thanks to the iTunes API team and library developers.
