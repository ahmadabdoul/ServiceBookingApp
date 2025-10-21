import { Booking, Category, Provider, User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { create } from 'zustand';

// Import the local mock data as a fallback and for online fetching
import localData from '../data/db.json';

const APP_DATA_CACHE_KEY = 'app_data_cache';

// Define the shape of our store's state
interface AppState {
  categories: Category[];
  providers: Provider[];
  bookings: Booking[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  initializeAppData: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  categories: [],
  providers: [],
  bookings: [],
  currentUser: null, // We'll set a default user for now
  isLoading: true,
  error: null,

  // The core action to fetch and manage data
  initializeAppData: async () => {
    set({ isLoading: true });

    try {
      const netState = await NetInfo.fetch();

      if (netState.isConnected && netState.isInternetReachable) {
        // --- ONLINE PATH ---
        console.log("App is online. Fetching fresh data...");
        // Simulate a network delay
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        const freshData = {
          categories: localData.categories,
          providers: localData.providers,
          bookings: localData.bookings,
          currentUser: localData.users[0], // Setting the first user as current
        };

        // Update the state
        set({ ...freshData, isLoading: false, error: null });

        // Cache the fresh data for offline use
        await AsyncStorage.setItem(APP_DATA_CACHE_KEY, JSON.stringify(freshData));
        console.log("Fresh data cached successfully.");

      } else {
        // --- OFFLINE PATH ---
        console.log("App is offline. Loading data from cache...");
        const cachedData = await AsyncStorage.getItem(APP_DATA_CACHE_KEY);

        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          set({ ...parsedData, isLoading: false, error: null });
          console.log("Data loaded from cache.");
        } else {
          // Handle the case where the user is offline and has no cache
          set({ isLoading: false, error: "You are offline and no data is cached." });
          console.log("Offline and no cache available.");
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        set({ isLoading: false, error: e.message });
      }
    }
  },
}));