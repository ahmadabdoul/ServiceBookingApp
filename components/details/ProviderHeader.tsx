import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProviderHeaderProps {
  
  mainImage: string;
}

export const ProviderHeader: React.FC<ProviderHeaderProps> = ({ mainImage }) => {
  const { theme } = useTheme();
  
  return (
    <View>
      <ImageBackground
        source={{ uri: mainImage }}
        className="h-64 w-full"
      >
        <SafeAreaView>
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="bg-white/80 dark:bg-gray-900/70 h-10 w-10 rounded-full items-center justify-center m-4"
          >
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color={theme === 'dark' ? 'white' : 'black'} 
            />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};