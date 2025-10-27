
  import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
  
  import { BookingSummary } from '@/components/bookings/BookingSummary'; // Adjusted path to match previous generations
import { HoursCounter } from '@/components/bookings/HoursCounter'; // Adjusted path
import { useAppContext } from '@/contexts/AppContext';
import { useTheme } from '@/hooks/useTheme';
import { Booking } from '@/types';
  
  const BookingModalScreen = () => {
    const { providerId } = useLocalSearchParams<{ providerId: string }>();
    const { providers, currentUser, addBooking } = useAppContext();
    const { theme } = useTheme();
  
    const provider = providers.find(p => p.id === Number(providerId));
    const [hours, setHours] = useState(1);
    
    const [isBooking, setIsBooking] = useState(false);
  
    const handleConfirmBooking = async () => {
    
      if (!provider || !currentUser) {
        Alert.alert("Error", "Could not complete booking. User or provider data is missing.");
        return;
      }
  
      setIsBooking(true); 
  
 
      try {
        const newBookingData: Omit<Booking, 'id'> = {
          providerId: provider.id,
          userId: currentUser.id,
          date: new Date().toISOString().split('T')[0],
          time: '14:00', 
          hours: hours,
          totalCost: provider.pricePerHour * hours,
          status: 'confirmed',
        };
  
        await addBooking(newBookingData);
  
        Alert.alert("Success!", "Your booking has been confirmed.", [
          { text: "OK", onPress: () => router.back() }
        ]);
  
      } catch (error) {
        console.error("Booking failed:", error);
        Alert.alert("Error", "Something went wrong while confirming your booking.");
      } finally {
        setIsBooking(false);
          }
    };
  
    if (!provider) {
      return (
        <SafeAreaView className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
          <Text className="text-lg text-red-500">Provider details could not be loaded.</Text>
        </SafeAreaView>
      );
    }
  
    return (
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">Book Service</Text>
          <TouchableOpacity onPress={() => router.back()} disabled={isBooking}>
            <Ionicons name="close-circle" size={28} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>
        </View>
        
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100">{provider.name}</Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 mt-1">
            Select the duration for your service.
          </Text>
          
          <View className="mt-8">
            <HoursCounter hours={hours} setHours={setHours} />
          </View>
  
          <BookingSummary pricePerHour={provider.pricePerHour} duration={hours} />
        </ScrollView>
  
        <View className="p-5 border-t border-gray-200 dark:border-gray-700">
          <TouchableOpacity 
            onPress={handleConfirmBooking}
            disabled={isBooking}
            className="bg-blue-500 rounded-xl p-4 items-center justify-center flex-row"
          >
            {isBooking ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-lg font-bold">Confirm Booking</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default BookingModalScreen;