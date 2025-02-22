import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import { Container } from '~/components/Container';
import RandomGradient from '~/utils/gradient';

const Create = () => {
  const gradient: string[] = RandomGradient(2);

  return (
    <View className="h-full flex-1 bg-white">
      <LinearGradient
        colors={gradient as [string, string, ...string[]]}
        style={StyleSheet.absoluteFill}
      />
      <Container>
        <View className="flex-row items-center justify-between">
          <Ionicons
            onPress={() => router.back()}
            name="close"
            size={24}
            color="white"
            className="rounded-full bg-zinc-700/10 p-1"
          />
          <Pressable className="rounded-full bg-white/20 p-3 px-6">
            <Text className="font-bold text-zinc-900"> Preview</Text>
          </Pressable>
        </View>
        <View className="flex-1 justify-center gap-4 p-4">
          <Text className="text-center text-2xl font-bold text-black">Create an Event</Text>
          <Text className="text-center text-xl font-bold text-black/60">Coming soon!</Text>
        </View>
      </Container>
    </View>
  );
};

export default Create;
