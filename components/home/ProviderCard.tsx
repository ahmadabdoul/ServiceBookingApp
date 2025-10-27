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
    <Link href={`(tabs)/home/provider/${provider.id}`} asChild>
      <TouchableOpacity className="flex-row items-center p-4 mb-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
        <Image 
          source={{ uri: provider.image }}
          className="w-24 h-24 rounded-2xl"
        />
        <View className="ml-4 flex-1">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">{provider.name}</Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 mt-1">{provider.categoryName}</Text>
          <View className="flex-row items-center mt-2">
            <Ionicons name="star" size={18} color="#FFC107" />
            <Text className="ml-1.5 text-lg text-gray-700 dark:text-gray-300 font-semibold">{provider.rating}</Text>
          </View>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="bookmark-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};

export default ProviderCard;
