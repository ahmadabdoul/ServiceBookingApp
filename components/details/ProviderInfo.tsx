import { Provider } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface ProviderInfoProps {
  provider: Provider;
}

export const ProviderInfo: React.FC<ProviderInfoProps> = ({ provider }) => {
  return (
    <View className="p-4 bg-white dark:bg-gray-800 rounded-t-3xl -mt-8">
      <Text className="text-3xl font-bold text-gray-900 dark:text-white">{provider.name}</Text>
      <View className="flex-row items-center my-2">
        <View className="flex-row items-center">
          <Ionicons name="star" size={18} color="#FFC107" />
          <Text className="ml-1 text-base text-gray-700 dark:text-gray-300">{provider.rating} ({provider.experienceYears} years)</Text>
        </View>
        <View className="flex-row items-center ml-4">
           <Ionicons name="location" size={18} color="#4B5563" />
           <Text className="ml-1 text-base text-gray-700 dark:text-gray-300">{provider.location.city}</Text>
        </View>
      </View>
      <Text className="text-base text-gray-600 dark:text-gray-400 leading-6">{provider.description}</Text>
    </View>
  );
};