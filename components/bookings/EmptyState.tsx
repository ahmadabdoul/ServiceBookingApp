import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface EmptyStateProps {
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <View className="flex-1 items-center justify-center mt-20">
      <Ionicons name="calendar-outline" size={64} color="#D1D5DB" />
      <Text className="text-lg text-gray-500 dark:text-gray-400 mt-4">{message}</Text>
      <TouchableOpacity 
        onPress={() => router.replace('/(tabs)/home')}
        className="mt-6 bg-blue-500 rounded-lg px-6 py-3"
      >
        <Text className="text-white font-bold">Book a Service</Text>
      </TouchableOpacity>
    </View>
  );
};