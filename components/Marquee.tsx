import { FC } from 'react';
import { Image, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const itemWidth = 250;

interface MarqueeItemProps {
  item: any;
  index: number;
  scroll: SharedValue<number>;
}

const MarqueeItem: FC<MarqueeItemProps> = ({ item, index, scroll }) => {
  const initialPosition = itemWidth * index;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: initialPosition - scroll.value,
    };
  });

  return (
    <Animated.View style={[{ width: itemWidth }, animatedStyle]} className="absolute h-full p-5">
      <Image source={item.image} className="h-full w-full rounded-3xl  shadow-lg shadow-black" />
    </Animated.View>
  );
};

const Marquee = ({ events }: { events: any[] }) => {
  const scroll = useSharedValue(0);
  const scrollSpeed = useSharedValue(50);

  useFrameCallback((frameInfo) => {
    const deltaTime = (frameInfo.timeSincePreviousFrame ?? 0) / 1000;
    scroll.value = scroll.value + scrollSpeed.value * deltaTime;
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scrollSpeed.value = 0;
    })
    .onChange((event) => {
      scroll.value = scroll.value - event.changeX;
    })

    .onFinalize((event) => {
      scrollSpeed.value = -event.velocityX;
      scrollSpeed.value = withTiming(50, { duration: 1000, easing: Easing.out(Easing.quad) });
    });

  return (
    <GestureDetector gesture={gesture}>
      <View className="h-full flex-row">
        {events.map((item, index) => (
          <MarqueeItem key={item.id} scroll={scroll} index={index} item={item} />
        ))}
      </View>
    </GestureDetector>
  );
};

export default Marquee;
