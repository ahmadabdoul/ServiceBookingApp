import React from 'react';
import { Text, View } from 'react-native';

interface BookingSummaryProps {
  pricePerHour: number;
  duration: number; // in hours
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({ pricePerHour, duration }) => {
  const total = pricePerHour * duration;

  return (
    <View className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
       <Text className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Booking Summary</Text>
      <View className="flex-row justify-between mb-2">
        <Text className="text-base text-gray-600 dark:text-gray-300">Service Fee</Text>
        <Text className="text-base text-gray-800 dark:text-gray-100">${pricePerHour}/hr</Text>
      </View>
       <View className="flex-row justify-between mb-4">
        <Text className="text-base text-gray-600 dark:text-gray-300">Duration</Text>
        <Text className="text-base text-gray-800 dark:text-gray-100">{duration} hrs</Text>
      </View>
      <View className="border-t border-gray-300 dark:border-gray-500 pt-4 flex-row justify-between">
        <Text className="text-lg font-bold text-gray-800 dark:text-gray-100">Total Cost</Text>
        <Text className="text-lg font-bold text-blue-500">${total}</Text>
      </View>
    </View>
  );
};