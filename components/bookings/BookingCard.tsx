import { EnrichedBooking } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface BookingCardProps {
  booking: EnrichedBooking;
}

const BookingCardComponent: React.FC<BookingCardProps> = ({ booking }) => {
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  const isUpcoming = booking.visualStatus === 'Upcoming';

  return (
    // --- MODIFICATION: Added `relative` positioning to the main container ---
    <View className="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
      {/* --- NEW: Status Badge --- */}
      <View 
        className={`absolute top-4 right-4 px-2 py-1 rounded-full ${
          isUpcoming 
            ? 'bg-blue-100 dark:bg-blue-900' 
            : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        <Text 
          className={`font-bold text-xs ${
            isUpcoming 
              ? 'text-blue-800 dark:text-blue-300' 
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {booking.visualStatus}
        </Text>
      </View>

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

export const BookingCard = React.memo(BookingCardComponent);