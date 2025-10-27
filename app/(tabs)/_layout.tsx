import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  const { theme } = useTheme();
  const colors = {
    light: { tabActive: '#3b82f6', tabInactive: '#6b7280' },
    dark: { tabActive: '#60a5fa', tabInactive: '#9ca3af' },
  };
  const currentColors = colors[theme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: currentColors.tabActive,
        tabBarInactiveTintColor: currentColors.tabInactive,
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#111827' : '#FFFFFF',
          borderTopColor: theme === 'dark' ? '#374151' : '#E5E7EB',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person-circle" size={26} color={color} />,
        }}
      />
      
    </Tabs>
  );
}