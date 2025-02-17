import { FC } from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface MarqueeItemProps {
  item: any;
  index: number;
  scroll: SharedValue<number>;
  containerWidth: number;
  itemWidth: number;
  screenWidth: number;
}

const MarqueeItem: FC<MarqueeItemProps> = ({
  item,
  index,
  scroll,
  containerWidth,
  screenWidth,
  itemWidth,
}) => {
  const shift = (containerWidth - screenWidth) / 2;

  const initialPosition = itemWidth * index - shift;

  const animatedStyle = useAnimatedStyle(() => {
    const position = ((initialPosition - scroll.value) % containerWidth) + shift;
    return {
      left: position,
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
  const { width: screenWidth } = useWindowDimensions();

  const itemWidth = screenWidth * 0.8;

  const contentWidth = itemWidth * events.length;

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
          <MarqueeItem
            key={item.id}
            itemWidth={itemWidth}
            screenWidth={screenWidth}
            containerWidth={contentWidth}
            scroll={scroll}
            index={index}
            item={item}
          />
        ))}
      </View>
    </GestureDetector>
  );
};

export default Marquee;
