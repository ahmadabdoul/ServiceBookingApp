import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { useAppContext } from '@/contexts/AppContext';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export const HomeHeader: React.FC = () => {
  const { currentUser } = useAppContext();
  const { theme, toggleTheme } = useTheme();

  
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
        
        <SkeletonLoader style={{ width: 48, height: 48, borderRadius: 24 }} />
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

      
      <TouchableOpacity 
        onPress={toggleTheme}
        className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm"
        accessibilityLabel="Change theme" 
        accessibilityRole="button"
      >
        
        {theme === 'dark' ? (
          <Ionicons name="sunny-outline" size={24} color="#FFC107" /> 
        ) : (
          <Ionicons name="moon-outline" size={24} color="#4B5563" /> 
        )}
        
      </TouchableOpacity>
    </View>
  );
};