import { useAppContext } from '@/contexts/AppContext';
import { Category } from '@/types';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface CategoryButtonProps {
  category: Category;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category }) => {
  
  const { activeCategoryId, setCategoryFilter } = useAppContext();
  const isActive = activeCategoryId === category.id;

  return (
    
    <TouchableOpacity 
      onPress={() => setCategoryFilter(category.id)}
      className="items-center mr-4 w-20"
    >
      <View 
        className={`w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full p-2 border-2 ${
          isActive 
            ? 'border-blue-500' 
            : 'border-transparent'
        }`}
      >
        <Image 
          source={{ uri: category.icon }} 
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <Text 
        className={`mt-2 text-sm text-center ${
          isActive 
            ? 'text-blue-500 font-bold' 
            : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;