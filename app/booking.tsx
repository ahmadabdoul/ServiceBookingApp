import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Calendar, CalendarTheme, DateData } from 'react-native-calendars';

import { useAppContext } from '@/contexts/AppContext';
import { useTheme } from '@/hooks/useTheme';
import { Booking } from '@/types';

import { BookingSummary } from '@/components/bookings/BookingSummary';
import { ConfirmationModal } from '@/components/bookings/ConfirmationModal';
import { HoursCounter } from '@/components/bookings/HoursCounter';
import { TimeSlotSelector } from '@/components/bookings/TimeSlotSelector';
import { SafeAreaView } from 'react-native-safe-area-context';

const BookingModalScreen = () => {
  const { providerId } = useLocalSearchParams<{ providerId: string }>();
  const { providers, currentUser, addBooking } = useAppContext();
  const { theme } = useTheme();
  const router = useRouter();

  const provider = providers.find(p => p.id === Number(providerId));

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [hours, setHours] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  
  const lightTheme: CalendarTheme = {
    backgroundColor: '#F9FAFB', 
    calendarBackground: '#F9FAFB',
    textSectionTitleColor: '#6B7280', 
    selectedDayBackgroundColor: '#3B82F6',
    selectedDayTextColor: '#FFFFFF',
    todayTextColor: '#3B82F6',
    dayTextColor: '#111827', 
    textDisabledColor: '#D1D5DB', 
    arrowColor: '#3B82F6',
    monthTextColor: '#111827',
    indicatorColor: '#3B82F6',
    
  };

  const darkTheme: CalendarTheme = {
    backgroundColor: '#111827',
    calendarBackground: '#111827',
    textSectionTitleColor: '#9CA3AF',
    selectedDayBackgroundColor: '#3B82F6',
    selectedDayTextColor: '#FFFFFF',
    todayTextColor: '#3B82F6',
    dayTextColor: '#FFFFFF',
    textDisabledColor: '#4B5563', 
    arrowColor: '#3B82F6',
    monthTextColor: '#FFFFFF',
    indicatorColor: '#3B82F6',
  };

  
  const calendarTheme = theme === 'dark' ? darkTheme : lightTheme;

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    };
    const handleConfirmBooking = async () => {
    if (!provider || !currentUser) {
    Alert.alert("Error", "Could not complete booking.");
    return;
    }
    setIsBooking(true);
try {
  const newBookingData: Omit<Booking, 'id'> = {
    providerId: provider.id,
    userId: currentUser.id,
    date: selectedDate,
    time: selectedTime,
    hours: hours,
    totalCost: provider.pricePerHour * hours,
    status: 'confirmed',
  };
  await addBooking(newBookingData);
  setConfirmModalVisible(false);
  
  router.replace('/success');

} catch (error) {
  Alert.alert("Error", "Something went wrong.");
} finally {
  setIsBooking(false);
}
};

  const totalCost = provider ? provider.pricePerHour * hours : 0;
  
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
        <Text className="text-xl font-bold text-gray-900 dark:text-white">Book {provider.name}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close-circle" size={28} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Calendar
          current={selectedDate}
          onDayPress={handleDayPress}
          minDate={new Date().toISOString().split('T')[0]}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#3B82F6' },
          }}
          
          theme={calendarTheme}
        />
        <View className="p-5">
          <TimeSlotSelector selectedTime={selectedTime} onSelectTime={setSelectedTime} />
          <View className="mt-6"><HoursCounter hours={hours} setHours={setHours} /></View>
          <BookingSummary pricePerHour={provider.pricePerHour} duration={hours} />
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <TouchableOpacity 
          onPress={() => setConfirmModalVisible(true)}
          className="bg-blue-500 rounded-xl p-4 items-center"
        >
          <Text className="text-white text-lg font-bold">Confirm - ${totalCost}</Text>
        </TouchableOpacity>
      </View>

      <ConfirmationModal
        isVisible={isConfirmModalVisible}
        isBooking={isBooking}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={handleConfirmBooking}
        bookingDetails={{
          providerName: provider.name,
          date: selectedDate,
          time: selectedTime,
          totalCost: totalCost
        }}
      />
    </SafeAreaView>
  );
};

export default BookingModalScreen;