import React, { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppContext } from '@/contexts/AppContext';


import { BookingCard } from '@/components/bookings/BookingCard';
import { EmptyState } from '@/components/bookings/EmptyState';

const MyBookingsScreen = () => {
  
  const { bookings, providers, categories, currentUser } = useAppContext();

  const enrichedBookings = useMemo(() => {
    if (!currentUser) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    return bookings
      .filter(b => b.userId === currentUser.id)
      .map(booking => {
        const provider = providers.find(p => p.id === booking.providerId);
        const category = categories.find(c => c.id === provider?.categoryId);
        
      
        const visualStatus = new Date(booking.date) >= today ? 'Upcoming' : 'Completed';

        return {
          ...booking,
          providerName: provider?.name || 'Unknown Provider',
          providerImage: provider?.image || '',
          categoryName: category?.name || 'Service',
          visualStatus,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); 

  }, [bookings, providers, categories, currentUser]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white">My Bookings</Text>
      </View>
      
      
      <FlatList
        data={enrichedBookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BookingCard booking={item} />}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListEmptyComponent={<EmptyState />} 
      />
    </SafeAreaView>
  );
};

export default MyBookingsScreen;