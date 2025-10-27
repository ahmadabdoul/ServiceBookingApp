import React, { useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppContext } from '@/contexts/AppContext';

// Import the new components
import { BookingCard } from '@/components/bookings/BookingCard';
import { EmptyState } from '@/components/bookings/EmptyState';
import { SegmentedControl } from '@/components/bookings/SegmentedControl';

const MyBookingsScreen = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const { bookings, providers, categories, currentUser } = useAppContext();

  const { upcomingBookings, pastBookings } = useMemo(() => {
    if (!currentUser) return { upcomingBookings: [], pastBookings: [] };

    const enriched = bookings
      .filter(b => b.userId === currentUser.id)
      .map(booking => {
        const provider = providers.find(p => p.id === booking.providerId);
        const category = categories.find(c => c.id === provider?.categoryId);
        return {
          ...booking,
          providerName: provider?.name || 'Unknown Provider',
          providerImage: provider?.image || '',
          categoryName: category?.name || 'Service',
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort newest first

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    
    const upcoming = enriched.filter(b => new Date(b.date) >= today);
    const past = enriched.filter(b => new Date(b.date) < today);

    return { upcomingBookings: upcoming, pastBookings: past };

  }, [bookings, providers, categories, currentUser]);


  const dataToShow = activeTab === 'Upcoming' ? upcomingBookings : pastBookings;
  const emptyMessage = activeTab === 'Upcoming' 
    ? "You have no upcoming bookings." 
    : "You have no past bookings.";

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white">My Bookings</Text>
        <View className="mt-6">
          <SegmentedControl 
            tabs={['Upcoming', 'Completed']} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </View>
      </View>

      <FlatList
        data={dataToShow}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BookingCard booking={item} />}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListEmptyComponent={<EmptyState message={emptyMessage} />}
      />
    </SafeAreaView>
  );
};

export default MyBookingsScreen;