import { Booking, Category, Provider, User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { create } from 'zustand';

import localData from '../data/db.json';

const APP_DATA_CACHE_KEY = 'app_data_cache';

interface AppState {
  categories: Category[];
  providers: Provider[];
  bookings: Booking[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  activeCategoryId: number | null;
  initializeAppData: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  
  categories: [],
  providers: [],
  bookings: [],
  currentUser: null, 
  isLoading: true,
  error: null,
  searchQuery: string;
    activeCategoryId: number | null;
  
  initializeAppData: async () => {
    set({ isLoading: true });

    try {
      const netState = await NetInfo.fetch();

      if (netState.isConnected && netState.isInternetReachable) {
        
        console.log("App is online. Fetching fresh data...");
        
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        const freshData = {
          categories: localData.categories,
          providers: localData.providers,
          bookings: localData.bookings,
          currentUser: localData.users[0], 
        };

        
        set({ ...freshData, isLoading: false, error: null });

        
        await AsyncStorage.setItem(APP_DATA_CACHE_KEY, JSON.stringify(freshData));
        console.log("Fresh data cached successfully.");

      } else {
        
        console.log("App is offline. Loading data from cache...");
        const cachedData = await AsyncStorage.getItem(APP_DATA_CACHE_KEY);

        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          set({ ...parsedData, isLoading: false, error: null });
          console.log("Data loaded from cache.");
        } else {
        
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