import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

export const SearchBar: React.FC = () => {
  const { theme } = useTheme();
  const placeholderColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  const iconColor = placeholderColor;

  return (
    <View className="flex-row items-center mt-6 w-full px-4">
      <View className="flex-1 flex-row items-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm px-4 py-3">
        <Ionicons name="search" size={22} color={iconColor} />
        <TextInput
          placeholder="Search for services..."
          placeholderTextColor={placeholderColor}
          className="flex-1 ml-3 text-lg text-gray-900 dark:text-white"
        />
      </View>

      <TouchableOpacity className="ml-4 bg-blue-500 dark:bg-blue-600 p-3 rounded-2xl shadow-md h-[50px] aspect-square items-center justify-center">
        <Ionicons name="options-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};
