import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/state/useAppStore';
import { ProviderWithCategory } from '@/types';
import React, { useEffect } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import all the necessary components
import CategoryButton from '@/components/home/CategoryButton';
import { HomeHeader } from '@/components/home/HomeHeader';
import { OfferBanner } from '@/components/home/OfferBanner';
import ProviderCard from '@/components/home/ProviderCard';
import { SearchBar } from '@/components/home/SearchBar';
import SkeletonLoader from '@/components/shared/SkeletonLoader';

const HomeScreen = () => {
  // Select multiple states from the store in a single hook
  const { providers, categories, isLoading, error, initializeAppData } = useAppStore((state) => ({
    providers: state.providers,
    categories: state.categories,
    isLoading: state.isLoading,
    error: state.error,
    initializeAppData: state.initializeAppData,
  }));
  const { theme } = useTheme();

  useEffect(() => {
    // Initialize the app data on first render
    initializeAppData();
  }, [initializeAppData]);

  // Display an alert if there's an error (e.g., offline with no cache)
  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  const providersWithCategory: ProviderWithCategory[] = providers.map(p => ({
    ...p,
    categoryName: categories.find(c => c.id === p.categoryId)?.name || 'Service',
  }));

  const renderSkeleton = () => (
    <View className="p-4">
      <HomeHeader /> {/* Header now has its own internal skeleton */}
      <SkeletonLoader style={{ width: '100%', height: 50, borderRadius: 12, marginTop: 24 }} />
      <SkeletonLoader style={{ width: '100%', height: 130, borderRadius: 16, marginTop: 24 }} />
      <View className="mt-6">
        <SkeletonLoader style={{ width: 150, height: 28, borderRadius: 8, marginBottom: 16 }} />
        <View className="flex-row">
          {[...Array(5)].map((_, i) => <SkeletonLoader key={i} style={{ width: 64, height: 88, marginRight: 16, borderRadius: 12 }} />)}
        </View>
      </View>
    </View>
  );

  const renderContent = () => (
    <View>
      <View className="p-4">
        <HomeHeader />
        <SearchBar />
        <OfferBanner />
      </View>
      <View className="mt-2">
        <Text className="text-2xl font-bold mb-4 text-gray-900 dark:text-white px-4">Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          {categories.map(cat => <CategoryButton key={cat.id} category={cat} />)}
        </ScrollView>
      </View>
      <View className="mt-6 p-4">
        <Text className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Top-Rated Providers</Text>
        {providersWithCategory.map(p => <ProviderCard key={p.id} provider={p} />)}
      </View>
    </View>
  );

  return (
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'dark' : ''} bg-gray-50 dark:bg-gray-900`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? renderSkeleton() : renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;