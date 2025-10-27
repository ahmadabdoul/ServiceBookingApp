import { EnrichedBooking } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface BookingCardProps {
  booking: EnrichedBooking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <View className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
      <View className="flex-row items-center">
        <Image source={{ uri: booking.providerImage }} className="w-16 h-16 rounded-lg" />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-bold text-gray-900 dark:text-white">{booking.providerName}</Text>
          <Text className="text-base text-gray-500 dark:text-gray-400">{booking.categoryName}</Text>
        </View>
      </View>
      <View className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-3 flex-row justify-between">
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text className="ml-2 text-gray-700 dark:text-gray-300">{formattedDate}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text className="ml-2 text-gray-700 dark:text-gray-300">{booking.time}</Text>
        </View>
      </View>
    </View>
  );
};