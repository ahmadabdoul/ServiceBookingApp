import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { useAppContext } from '@/contexts/AppContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export const HomeHeader: React.FC = () => {
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return (
      <View className="flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-900">
        <View className="flex-row items-center">
          <SkeletonLoader style={{ width: 48, height: 48, borderRadius: 24 }} />
          <View className="ml-4">
            <SkeletonLoader style={{ width: 80, height: 20, borderRadius: 6 }} />
            <SkeletonLoader style={{ width: 120, height: 24, borderRadius: 6, marginTop: 4 }} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-900">
      <View className="flex-row items-center">
        <Image source={{ uri: currentUser.avatar }} className="w-12 h-12 rounded-full" />
        <View className="ml-4">
          <Text className="text-base text-gray-500 dark:text-gray-400">Hello,</Text>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.name.split(' ')[0]}!</Text>
        </View>
      </View>
      <TouchableOpacity className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
        <Ionicons name="notifications-outline" size={24} color={currentUser ? '#3B82F6' : '#9CA3AF'} />
        <View className="w-2.5 h-2.5 bg-blue-500 rounded-full absolute top-2 right-2 border-2 border-white dark:border-gray-800" />
      </TouchableOpacity>
    </View>
  );
};
