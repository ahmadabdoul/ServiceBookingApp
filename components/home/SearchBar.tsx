import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

export const SearchBar: React.FC = () => {
  const { theme } = useTheme();
  const placeholderColor = theme === 'dark' ? '#9CA3AF' : '#6B7280'; // gray-400 or gray-500
  const iconColor = placeholderColor;

  return (
    <View className="flex-row items-center mt-6 w-full">
      {/* Search Input Container */}
      <View className="flex-1 flex-row items-center bg-white dark:bg-gray-800 rounded-xl shadow-sm px-4 py-3">
        <Ionicons 
          name="search" 
          size={22} 
          color={iconColor} 
        />
        <TextInput
          placeholder="Search for services..."
          placeholderTextColor={placeholderColor}
          className="flex-1 ml-3 text-base text-gray-900 dark:text-white"
          // Add state and onChangeText handlers here to make it functional
        />
      </View>

      {/* Filter Button */}
      <TouchableOpacity className="ml-3 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm h-[50px] aspect-square items-center justify-center">
        <Ionicons 
          name="options-outline" 
          size={24} 
          color="#3b82f6" // brand-blue-500
        />
      </TouchableOpacity>
    </View>
  );
};