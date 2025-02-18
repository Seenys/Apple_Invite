import '../global.css';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Stack>
        <Stack.Screen
          name="welcomeScreen"
          options={{ headerShown: false, presentation: 'fullScreenModal' }}
        />
        <Stack.Screen
          name="create"
          options={{ headerShown: false, presentation: 'fullScreenModal' }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
