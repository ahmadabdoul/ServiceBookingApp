import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const OfferBanner: React.FC = () => {
  return (
    <View className="mt-6 shadow-lg">
      <LinearGradient
        // Gradient colors from the design
        colors={['#38BDF8', '#3B82F6']} // sky-400 to blue-500
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl overflow-hidden"
      >
        <View className="flex-row items-center p-5 min-h-[130px]">
          {/* Text Content */}
          <View className="flex-1 z-10">
            <Text className="text-white text-2xl font-extrabold tracking-tight">
              GET 20% OFF
            </Text>
            <Text className="text-white text-base mt-1">
              Your First Booking!
            </Text>
            <TouchableOpacity className="bg-white rounded-lg px-4 py-2 mt-4 self-start">
              <Text className="text-blue-500 font-bold">Book Now</Text>
            </TouchableOpacity>
          </View>

          {/* Decorative Background Shapes */}
          <View className="w-28 h-28 absolute -right-5 -bottom-5 bg-white/20 rounded-full" />
          <View className="w-20 h-20 absolute right-16 -top-5 bg-white/10 rounded-full" />
        </View>
      </LinearGradient>
    </View>
  );
};