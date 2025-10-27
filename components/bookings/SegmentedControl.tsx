import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SegmentedControlProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View className="flex-row bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabChange(tab)}
          className={`flex-1 p-2 rounded-md ${activeTab === tab ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
        >
          <Text className={`text-center font-bold ${activeTab === tab ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};