import { useTheme } from '@/hooks/useTheme';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { ProviderHeader } from '@/components/details/ProviderHeader';
import { ProviderInfo } from '@/components/details/ProviderInfo';
import { StickyBookingFooter } from '@/components/details/StickyBookingFooter';
import { WorkGallery } from '@/components/details/WorkGallery';
import { useAppContext } from '@/contexts/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProviderDetailsScreen = () => {
  
  const { providerId } = useLocalSearchParams<{ providerId: string }>();
  const { theme } = useTheme();

  const { providers, isLoading } = useAppContext();
  
  
  const provider = providers.find(p => p.id === Number(providerId));

  if (isLoading && !provider) { 
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <ActivityIndicator size="large" color={theme === 'dark' ? 'white' : 'black'} />
      </View>
    );
  }

  if (!provider) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Text className="text-lg text-red-500">Provider with ID "{providerId}" not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'dark' : ''} bg-gray-50 dark:bg-gray-900`}>
   
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}> 
        <ProviderHeader mainImage={provider.gallery[0] || provider.image} />
        <ProviderInfo provider={provider} />
        <WorkGallery images={provider.gallery} />
      </ScrollView>
      
      <StickyBookingFooter provider={provider} />
    </View>
    </SafeAreaView>
  );
};

export default ProviderDetailsScreen;