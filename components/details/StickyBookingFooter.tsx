import { Provider } from '@/types';
import { Link } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface StickyBookingFooterProps {
  provider: Provider;
}

export const StickyBookingFooter: React.FC<StickyBookingFooterProps> = ({ provider }) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex-row justify-between items-center">
      <View>
        <Text className="text-gray-500 dark:text-gray-400">Price</Text>
        <Text className="text-xl font-bold text-gray-900 dark:text-white">${provider.pricePerHour}/hr</Text>
      </View>
      <Link href="/booking-modal" asChild>
        <TouchableOpacity className="bg-blue-500 rounded-lg px-8 py-3">
          <Text className="text-white text-lg font-bold">Book Now</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};