import { Provider } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface ProviderInfoProps {
  provider: Provider;
}

export const ProviderInfo: React.FC<ProviderInfoProps> = ({ provider }) => {
  return (
    <View className="bg-gray-50 dark:bg-gray-900 rounded-t-3xl -mt-8 pt-6 p-5">
      <View className="flex-row items-end">
        <Image
          source={{ uri: provider.image }}
          className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-700"
        />
        <View className="ml-4 flex-1">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white" numberOfLines={2}>
            {provider.name}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center my-4">
        <View className="flex-row items-center bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1">
          <Ionicons name="star" size={16} color="#FFC107" />
          <Text className="ml-1 font-bold text-gray-700 dark:text-gray-300">{provider.rating}</Text>
        </View>
        <View className="flex-row items-center ml-3">
           <Ionicons name="location-outline" size={18} color="#6B7280" />
           <Text className="ml-1 text-base text-gray-600 dark:text-gray-400">{provider.location.city}</Text>
        </View>
      </View>

      <View>
        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2">Description</Text>
        <Text className="text-base text-gray-600 dark:text-gray-400 leading-6">
          {provider.description}
        </Text>
      </View>
    </View>
  );
};