import { Provider } from '@/types';
import { Link } from 'expo-router';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

interface StickyBookingFooterProps {
  provider: Provider;
}

export const StickyBookingFooter: React.FC<StickyBookingFooterProps> = ({ provider }) => {
  const bottomPadding = Platform.OS === 'ios' ? 'pb-8' : 'pb-4';

  return (
    <View className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pt-4 px-5 ${bottomPadding}`}>
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-gray-500 dark:text-gray-400">Price Per Hour</Text>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">${provider.pricePerHour}</Text>
        </View>
        
        {/* Use the `href` object to pass parameters to the modal route */}
        <Link 
          href={{
            pathname: "/booking",
            params: { providerId: provider.id }
          }} 
          asChild
        > 
          <TouchableOpacity className="bg-blue-500 rounded-xl px-10 py-4">
            <Text className="text-white text-lg font-bold">Book Now</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};