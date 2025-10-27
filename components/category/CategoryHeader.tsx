import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CategoryHeaderProps {
  title: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title }) => {
  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? 'white' : 'black';

  return (
    <SafeAreaView className="bg-gray-50 dark:bg-gray-900">
      <View className="relative flex-row items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="absolute left-4 top-4 p-1"
        >
          <Ionicons name="arrow-back" size={28} color={iconColor} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 dark:text-white">{title}</Text>
      </View>
    </SafeAreaView>
  );
};