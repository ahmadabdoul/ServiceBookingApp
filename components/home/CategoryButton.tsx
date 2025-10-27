import { Category } from '@/types';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

interface CategoryButtonProps {
  category: Category;
}


const CategoryButton: React.FC<CategoryButtonProps> = ({ category }) => {
  const router = useRouter();
  return (
    // Link component wraps the button to handle navigation
    // The `href` creates the dynamic URL for our new screen
    // `asChild` ensures the Link passes down press handling to the TouchableOpacity
    
      <TouchableOpacity className="items-center mr-4 w-20" onPress={()=>{ router.push(`/home/category/${category.id}`)}}>
        <Image 
          source={{ uri: category.icon }} 
          className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full p-2"
          resizeMode="contain"
        />
        <Text className="mt-2 text-sm text-center text-gray-700 dark:text-gray-300">
          {category.name}
        </Text>
      </TouchableOpacity>
    
  );
};

export default CategoryButton;