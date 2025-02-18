import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInUp, FadeOut, SlideInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import EventCard from '~/components/EventCard';
import Marquee from '~/components/Marquee';
import { Container } from '~/components/Container';

const initialData = [
  {
    id: 1,
    name: 'John Doe',
    image: require('../assets/image/1.jpg'),
  },
  {
    id: 2,
    name: 'Jane Doe',
    image: require('../assets/image/2.jpg'),
  },
  {
    id: 3,
    name: 'John Smith',
    image: require('../assets/image/3.jpg'),
  },
  {
    id: 4,
    name: 'Jane Smith',
    image: require('../assets/image/4.jpg'),
  },
  {
    id: 5,
    name: 'John Johnson',
    image: require('../assets/image/5.jpg'),
  },
];
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const WelcomeScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onButtonPress = () => {
    router.push('/create');
  };

  return (
    <View className="h-full flex-1">
      <Animated.Image
        key={initialData[activeIndex].image}
        source={initialData[activeIndex].image}
        className="absolute h-full w-full"
        resizeMode="cover"
        blurRadius={9}
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(500)}
      />
      <View className="absolute h-full w-full bg-black/30" />

      <Container>
        <Animated.View
          className="h-3/5 w-full"
          entering={SlideInUp.duration(1500).springify().mass(1).damping(30)}>
          <Marquee
            events={initialData}
            onIndexChange={setActiveIndex}
            renderItem={({ item }) => <EventCard event={item} />}
          />
        </Animated.View>

        <View className="flex-1 justify-center gap-4 p-4">
          <Animated.Text
            className="text-center text-2xl font-bold text-white/60"
            entering={FadeInUp.delay(500).springify().mass(2).damping(30)}>
            Welcome to
          </Animated.Text>
          <Animated.Text
            className="text-center text-6xl font-bold text-white"
            entering={FadeInUp.springify().mass(3).damping(30)}>
            Invite Event
          </Animated.Text>
          <Animated.Text
            className="mb-5 text-center text-xl font-bold text-white/60"
            entering={FadeInUp.delay(500).springify().mass(2).damping(30)}>
            Create beautiful invitations for your evens. Anyone can receive invitations.
          </Animated.Text>
          <AnimatedPressable
            onPress={onButtonPress}
            className="items-center self-center rounded-full bg-white px-10 py-4"
            entering={FadeInUp.delay(500).springify().mass(2).damping(30)}>
            <Text className="text-lg">Create an Event</Text>
          </AnimatedPressable>
        </View>
      </Container>
    </View>
  );
};

export default WelcomeScreen;
