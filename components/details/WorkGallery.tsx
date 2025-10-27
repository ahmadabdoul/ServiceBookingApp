import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface WorkGalleryProps {
  images: string[];
}

export const WorkGallery: React.FC<WorkGalleryProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <View className="bg-gray-50 dark:bg-gray-900 pt-4 pb-8 px-5">
      <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">Work Gallery</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((url, index) => (
          <TouchableOpacity key={index} className="mr-3">
            <Image
              source={{ uri: url }}
              className="w-28 h-28 rounded-lg bg-gray-200"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};