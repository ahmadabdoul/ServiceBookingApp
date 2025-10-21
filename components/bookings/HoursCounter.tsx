import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface HoursCounterProps {
  hours: number;
  setHours: (hours: number) => void;
}

export const HoursCounter: React.FC<HoursCounterProps> = ({ hours, setHours }) => {
  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? '#9CA3AF' : '#4B5563';

  return (
    <View>
      <Text className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Number of Hours</Text>
      <View className="flex-row items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
        <TouchableOpacity onPress={() => setHours(Math.max(1, hours - 1))} className="p-2">
          <Ionicons name="remove-circle-outline" size={28} color={iconColor} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 dark:text-white">{hours} Hours</Text>
        <TouchableOpacity onPress={() => setHours(hours + 1)} className="p-2">
          <Ionicons name="add-circle" size={28} color="#3b82f6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};