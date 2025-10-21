import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { useAppStore } from '@/state/useAppStore';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export const HomeHeader: React.FC = () => {
  // Get the current user directly from the global store
  const currentUser = useAppStore((state) => state.currentUser);

  if (!currentUser) {
    // Show a skeleton while the user data is loading
    return (
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <SkeletonLoader style={{ width: 48, height: 48, borderRadius: 24 }} />
          <View className="ml-3">
            <SkeletonLoader style={{ width: 80, height: 20, borderRadius: 6 }} />
            <SkeletonLoader style={{ width: 120, height: 24, borderRadius: 6, marginTop: 4 }} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Image source={{ uri: currentUser.avatar }} className="w-12 h-12 rounded-full" />
        <View className="ml-3">
          <Text className="text-gray-500 dark:text-gray-400">Hello,</Text>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.name.split(' ')[0]}!</Text>
        </View>
      </View>
      <TouchableOpacity className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
        <View className="w-2 h-2 bg-blue-500 rounded-full absolute top-2 right-2" />
      </TouchableOpacity>
    </View>
  );
};