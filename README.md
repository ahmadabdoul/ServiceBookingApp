# Service Booking App

This is a React Native application built with Expo that allows users to book services from a variety of providers.

## Key Features

* **Browse Service Providers:** View a list of available service providers, filter them by category, and search for specific providers.
* **View Provider Details:** See detailed information about each provider, including their services, ratings, and work gallery.
* **Book Services:** Select a date, time, and service duration to book an appointment with a provider.
* **View Bookings:** Keep track of upcoming and past bookings.
* **Dark Mode:** The application supports both light and dark themes.

## Tech Stack

* **React Native & Expo:** For building the cross-platform mobile application.
* **Expo Router:** For navigation between screens.
* **React Context API & `useReducer`:** For global state management.
* **Zustand:** A redundant state management library is present but not fully integrated.
* **NativeWind:** For styling the application using Tailwind CSS.
* **TypeScript:** For static typing and improved developer experience.
* **AsyncStorage:** For caching data locally on the device.

## Getting Started

### Prerequisites

* Node.js (v18 or newer)
* npm or yarn
* Expo Go app on your mobile device (for testing on a physical device)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Run on a mobile device or simulator:**
   - **iOS:** Press `i` in the terminal to run the app in the iOS simulator.
   - **Android:** Press `a` in the terminal to run the app in the Android emulator.
   - **Physical Device:** Scan the QR code displayed in the terminal with the Expo Go app on your phone.

## Project Structure

The project is organized into the following directories:

- `app/`: Contains the screen layouts and navigation setup using Expo Router.
- `assets/`: Stores static assets like fonts and images.
- `components/`: Includes reusable React components used throughout the application.
- `constants/`: Holds constant values, such as color schemes.
- `contexts/`: Contains the React Context files for state management.
- `data/`: Includes the local JSON file (`db.json`) that serves as the database.
- `hooks/`: Stores custom hooks.
- `state/`: Contains the Zustand store files.
- `types/`: Defines the TypeScript types and interfaces used in the project.
