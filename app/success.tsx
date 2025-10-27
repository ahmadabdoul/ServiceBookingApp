import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { SafeAreaView } from 'react-native-safe-area-context';

const BookingSuccessScreen = () => {
  const router = useRouter();
  const cannon = useRef<ConfettiCannon>(null);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900 p-5">
      <View className="items-center">
        <View className="bg-green-100 dark:bg-green-900 p-6 rounded-full">
          <Ionicons name="checkmark-done-circle" size={80} color="#10B981" />
        </View>
        <Text className="text-3xl font-extrabold text-gray-900 dark:text-white mt-6">Success!</Text>
        <Text className="text-lg text-center text-gray-500 dark:text-gray-400 mt-2">
          Your booking has been confirmed. You can view its details in the "My Bookings" tab.
        </Text>
      </View>

      <TouchableOpacity 
        onPress={() => router.replace('/(tabs)/bookings')}
        className="absolute bottom-10 bg-blue-500 rounded-xl p-4 w-full items-center"
      >
        <Text className="text-white text-lg font-bold">View My Bookings</Text>
      </TouchableOpacity>
      
      <ConfettiCannon
        ref={cannon}
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart
        fadeOut
      />
    </SafeAreaView>
  );
};

export default BookingSuccessScreen;