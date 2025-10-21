import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';

interface ProviderHeaderProps {
  image: string;
  onPressBack?: () => void;
}

export const ProviderHeader: React.FC<ProviderHeaderProps> = ({ image }) => {
  const { theme } = useTheme();
  return (
    <ImageBackground source={{ uri: image }} className="h-64 w-full">
      <View className="flex-1 bg-black/30 p-4 pt-16">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="bg-white/90 dark:bg-gray-800/90 h-10 w-10 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};