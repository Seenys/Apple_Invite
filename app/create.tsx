import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Container } from '~/components/Container';
import RandomGradient from '~/utils/gradient';

const Create = () => {
  const gradient: string[] = RandomGradient(3);

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
        <View className="h-1/2 w-full items-center justify-center ">
          <Ionicons
            className="bg-white/20 rounded-full p-2"
            name="image"
            size={42}
            color="rgba(255,255,255,0.7)"
          />
          <Pressable className="rounded-full bg-white/20 p-3 px-6 mt-4">
            <Text className="font-bold text-white"> Add Image</Text>
          </Pressable>
        </View>
        <View className="rounded-3xl border border-white/15 overflow-hidden">
          <View className="bg-zinc-700/10 ">
            <View className="border-b border-white/20 p-4">
              <TextInput
                placeholder="Event title"
                placeholderTextColor="rgba(255,255,255,0.5)"
                className=" text-center text-white font-bold text-4xl"
              />
            </View>
            <View className="border-b border-white/20 p-4 items-center justify-center gap-4">
              <Ionicons name="calendar" size={24} color="rgba(255,255,255,0.7)" />
              <Text className="text-white/80 font-medium ">Date and Time</Text>
            </View>
            <View className="border-b border-white/20 p-4 items-center justify-center gap-4">
              <Ionicons name="pin" size={24} color="rgba(255,255,255,0.7)" />
              <Text className="text-white/80 font-medium ">Location</Text>
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
};

export default Create;
