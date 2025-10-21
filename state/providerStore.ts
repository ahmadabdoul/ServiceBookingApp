import data from '@/data/db.json';
import { Category, Provider } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';

const PROVIDER_CACHE_KEY = 'provider_data_cache';


interface ProviderState {
  providers: Provider[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchProviders: () => Promise<void>;
}

export const useProviderStore = create<ProviderState>((set) => ({
  providers: [],
  categories: [],
  isLoading: true,
  error: null,

  fetchProviders: async () => {
    set({ isLoading: true });
    try {
      const cachedData = await AsyncStorage.getItem(PROVIDER_CACHE_KEY);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData) as { providers: Provider[]; categories: Category[] };
        set({ providers: parsedData.providers, categories: parsedData.categories });
      }
    } catch (e) {
      console.error("Failed to load data from cache", e);
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const freshData = { providers: data.providers, categories: data.categories };
      
      set({ providers: freshData.providers, categories: freshData.categories, isLoading: false });
      await AsyncStorage.setItem(PROVIDER_CACHE_KEY, JSON.stringify(freshData));

    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      }
    }
  },
}));