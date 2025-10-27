import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';


const timeSlots = [
  '09:00 AM', 
  '10:00 AM', 
  '11:00 AM', 
  '01:00 PM', 
  '02:00 PM', 
  '03:00 PM', 
  '04:00 PM'
];

interface TimeSlotSelectorProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ 
  selectedTime, 
  onSelectTime 
}) => {
  return (
    <View className="mt-6">
      <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
        Select Time
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="-mx-5" 
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {timeSlots.map((time) => {
          const isSelected = selectedTime === time;
          return (
            <TouchableOpacity
              key={time}
              onPress={() => onSelectTime(time)}
              
              className={`
                px-5 py-3 mr-3 rounded-xl border
                ${
                  isSelected
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                }
              `}
            >
              <Text 
                className={`
                  font-bold text-base
                  ${
                    isSelected 
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                {time}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};