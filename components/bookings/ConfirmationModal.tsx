
import { EnrichedBooking } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';

interface ConfirmationModalProps {
  isVisible: boolean;
  isBooking: boolean;
  bookingDetails: Partial<EnrichedBooking>;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isVisible, isBooking, bookingDetails, onClose, onConfirm }) => {
  const formattedDate = bookingDetails.date 
    ? new Date(bookingDetails.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : '';

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/60 p-5">
        <View className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6">
          <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white">Confirm Booking</Text>
          <Text className="text-base text-center text-gray-500 dark:text-gray-400 mt-2">Please review the details of your service appointment.</Text>
          
          <View className="border-y border-gray-200 dark:border-gray-700 my-5 py-4 space-y-3">
            <InfoRow icon="person-outline" label="Provider" value={bookingDetails.providerName} />
            <InfoRow icon="calendar-outline" label="Date" value={formattedDate} />
            <InfoRow icon="time-outline" label="Time" value={bookingDetails.time} />
            <InfoRow icon="cash-outline" label="Total Cost" value={`$${bookingDetails.totalCost}`} isBold />
          </View>

          <TouchableOpacity
            onPress={onConfirm}
            disabled={isBooking}
            className="bg-blue-500 rounded-xl p-4 flex-row items-center justify-center"
          >
            {isBooking ? <ActivityIndicator color="white" /> : <Text className="text-white text-lg font-bold">Confirm & Book</Text>}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClose}
            disabled={isBooking}
            className="mt-3 p-4 items-center"
          >
            <Text className="text-gray-500 dark:text-gray-400 font-bold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const InfoRow: React.FC<{ icon: keyof typeof Ionicons.glyphMap; label: string; value?: string; isBold?: boolean }> = ({ icon, label, value, isBold }) => (
  <View className="flex-row justify-between items-center">
    <View className="flex-row items-center">
      <Ionicons name={icon} size={18} color="#9CA3AF" />
      <Text className="ml-3 text-base text-gray-500 dark:text-gray-400">{label}</Text>
    </View>
    <Text className={`text-base text-gray-900 dark:text-white ${isBold ? 'font-extrabold' : 'font-semibold'}`}>{value}</Text>
  </View>
);