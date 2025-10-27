import { Stack } from 'expo-router';

export default function HomeStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="[providerId]" options={{ headerShown: false }} />
      {/* <Stack.Screen name="[id]" options={{ headerShown: false }} /> */}
      
    </Stack>
  );
}