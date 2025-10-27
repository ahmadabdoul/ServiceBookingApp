import { AppState, Booking, Category, Provider, User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import React, { useCallback, useMemo } from 'react';
import localData from '../data/db.json';

const APP_DATA_CACHE_KEY = 'app_data_cache';

// 1. Define Action Types
type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_DATA_SUCCESS'; payload: { categories: Category[]; providers: Provider[]; bookings: Booking[]; currentUser: User | null; } }
  | { type: 'SET_ERROR'; payload: string };

// 2. Define the Context Shape
interface AppContextType extends AppState {
  initializeAppData: () => Promise<void>;
}

// 3. Create the Reducer
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: true, error: null };
    case 'SET_DATA_SUCCESS':
      return { ...state, isLoading: false, ...action.payload };
    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

// 4. Create the Context
const AppContext = React.createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  categories: [],
  providers: [],
  bookings: [],
  currentUser: null,
  isLoading: true,
  error: null,
};

// 5. Create the Provider Component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  const initializeAppData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING' });
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
        dispatch({ type: 'SET_DATA_SUCCESS', payload: freshData });
        await AsyncStorage.setItem(APP_DATA_CACHE_KEY, JSON.stringify(freshData));
        console.log("Fresh data cached successfully.");
      } else {
        console.log("App is offline. Loading data from cache...");
        const cachedData = await AsyncStorage.getItem(APP_DATA_CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          dispatch({ type: 'SET_DATA_SUCCESS', payload: parsedData });
          console.log("Data loaded from cache.");
        } else {
          dispatch({ type: 'SET_ERROR', payload: "You are offline and no data is cached." });
          console.log("Offline and no cache available.");
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: e.message });
      }
    }
  }, []);

  React.useEffect(() => {
    initializeAppData();
  }, [initializeAppData]);

  const contextValue = useMemo(() => ({
    ...state,
    initializeAppData,
  }), [state, initializeAppData]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// 6. Create the Custom Hook
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
