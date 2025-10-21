import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface SkeletonLoaderProps {
  style?: StyleProp<ViewStyle>;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ style }) => {
  const sharedValue = useSharedValue(0);

  useEffect(() => {
    sharedValue.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.5 + sharedValue.value * 0.5,
  }));
  
  
  const { width, height, ...restStyle } = (style as ViewStyle) || {};

  return (
    <Animated.View
      style={[
        { width, height },
        { backgroundColor: '#E1E9EE' },
        animatedStyle,
        restStyle
      ]}
      className="rounded-md dark:bg-gray-700"
    />
  );
};

export default SkeletonLoader;