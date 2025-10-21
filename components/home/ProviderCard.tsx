import { ProviderWithCategory } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ProviderCardProps {
  provider: ProviderWithCategory;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <Link href={`/providers/${provider.id}`} asChild>
      <TouchableOpacity className="flex-row items-center p-4 mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <Image 
          source={{ uri: provider.image }}
          className="w-20 h-20 rounded-lg"
        />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-bold text-gray-900 dark:text-white">{provider.name}</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">{provider.categoryName}</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text className="ml-1 text-gray-600 dark:text-gray-300">{provider.rating}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#CBD5E1" />
      </TouchableOpacity>
    </Link>
  );
};

export default ProviderCard;