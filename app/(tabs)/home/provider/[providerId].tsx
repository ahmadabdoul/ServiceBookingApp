import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/state/useAppStore';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';


import { ProviderHeader } from '@/components/details/ProviderHeader';
import { ProviderInfo } from '@/components/details/ProviderInfo';
import { StickyBookingFooter } from '@/components/details/StickyBookingFooter';
import { WorkGallery } from '@/components/details/WorkGallery';

const ProviderDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();

  const { providers, isLoading } = useAppStore((state) => ({
    providers: state.providers,
    isLoading: state.isLoading,
  }));

  const provider = providers.find(p => p.id === Number(id));

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <ActivityIndicator size="large" color={theme === 'dark' ? 'white' : 'black'} />
      </View>
    );
  }

  if (!provider) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Text className="text-lg text-red-500">Provider not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}> 
        {/* Add padding to prevent content from being hidden by the sticky footer */}
        <ProviderHeader mainImage={provider.gallery[0] || provider.image} />
        <ProviderInfo provider={provider} />
        <WorkGallery images={provider.gallery} />
      </ScrollView>
      
      <StickyBookingFooter provider={provider} />
    </View>
  );
};

export default ProviderDetailsScreen;