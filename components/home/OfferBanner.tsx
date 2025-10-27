import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const OfferBanner: React.FC = () => {
  return (
    <View className="mt-6 shadow-xl rounded-3xl mx-4">
      <LinearGradient
        colors={['#38BDF8', '#3B82F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl overflow-hidden"
      >
        <View className="flex-row items-center p-6 min-h-[140px]">
          <View className="flex-1 z-10">
            <Text className="text-white text-3xl font-extrabold tracking-tight">
              GET 25% OFF
            </Text>
            <Text className="text-white text-lg mt-1">
              Your First Booking!
            </Text>
            <TouchableOpacity className="bg-white rounded-xl px-5 py-2.5 mt-5 self-start shadow-md">
              <Text className="text-blue-500 font-bold text-base">Book Now</Text>
            </TouchableOpacity>
          </View>

          <View className="w-32 h-32 absolute -right-6 -bottom-6 bg-white/20 rounded-full" />
          <View className="w-24 h-24 absolute right-20 -top-6 bg-white/10 rounded-full" />
        </View>
      </LinearGradient>
    </View>
  );
};
