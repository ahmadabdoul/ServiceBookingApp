import { Category } from '@/types';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

interface CategoryButtonProps {
  category: Category;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category }) => {
  return (
    <TouchableOpacity className="items-center mr-4">
      <Image 
        source={{ uri: category.icon }} 
        className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full p-2"
        resizeMode="contain"
      />
      <Text className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;