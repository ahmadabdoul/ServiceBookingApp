import { useAppContext } from '@/contexts/AppContext';
import { useTheme } from '@/hooks/useTheme';
import { ProviderWithCategory } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

// Import reusable components
import { CategoryHeader } from '@/components/category/CategoryHeader';
import ProviderCard from '@/components/home/ProviderCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const CategoryProviderListScreen = () => {
  const { theme } = useTheme();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  // Get all data from the global store
  const { providers, categories, isLoading, error, initializeAppData } = useAppContext();
  // Find the current category's name
  const category = categories.find(cat => cat.id === Number(categoryId));
  
  // Filter the providers based on the categoryId from the URL
  const filteredProviders: ProviderWithCategory[] = providers
    .filter(provider => provider.categoryId === Number(categoryId))
    .map(p => ({
      ...p,
      categoryName: category?.name || 'Service',
    }));

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <ActivityIndicator size="large" color={theme === 'dark' ? 'white' : 'black'} />
      </View>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'dark' : ''} bg-gray-50 dark:bg-gray-900`}>
   
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <CategoryHeader title={category?.name || 'Category'} />
      
      <FlatList
        data={filteredProviders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProviderCard provider={item} />}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-lg text-gray-500 dark:text-gray-400">
              No providers found in this category.
            </Text>
          </View>
        }
      />
    </View>
    </SafeAreaView>
  );
};

export default CategoryProviderListScreen;