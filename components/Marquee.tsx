import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';

interface MarqueeItemProps {
  index: number;
  scroll: SharedValue<number>;
  containerWidth: number;
  itemWidth: number;
  screenWidth: number;
}

const MarqueeItem: FC<PropsWithChildren<MarqueeItemProps>> = ({
  index,
  scroll,
  containerWidth,
  screenWidth,
  itemWidth,
  children,
}) => {
  const shift = (containerWidth - screenWidth) / 2;

  const initialPosition = itemWidth * index - shift;

  const animatedStyle = useAnimatedStyle(() => {
    const position = ((initialPosition - scroll.value) % containerWidth) + shift;
    const rotation = interpolate(position, [0, screenWidth - itemWidth], [-0.3, 0.3]);
    const translateY = interpolate(
      position,
      [0, (screenWidth - itemWidth) / 2, screenWidth - itemWidth],
      [2, 0, 2]
    );

    return {
      left: position,
      transform: [{ rotate: `${rotation}deg` }, { translateY }],
    };
  });

  return (
    <Animated.View
      style={[{ width: itemWidth, transformOrigin: 'bottom' }, animatedStyle]}
      className="absolute h-full p-5 ">
      {children}
    </Animated.View>
  );
};

const Marquee = ({
  events,
  onIndexChange,
  renderItem,
}: {
  events: any[];
  onIndexChange?: (index: number) => void;
  renderItem: ({ item, index }: { item: any; index: number }) => React.ReactNode;
}) => {
  const scroll = useSharedValue(0);
  const scrollSpeed = useSharedValue(50);
  const { width: screenWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const itemWidth = screenWidth * 0.8;

  const contentWidth = itemWidth * events.length;

  useEffect(() => {
    onIndexChange && onIndexChange(activeIndex);
  }, [activeIndex]);

  useFrameCallback((frameInfo) => {
    const deltaTime = (frameInfo.timeSincePreviousFrame ?? 0) / 1000;
    scroll.value = scroll.value + scrollSpeed.value * deltaTime;
  });

  useAnimatedReaction(
    () => scroll.value,
    (value) => {
      const normalized = (value + screenWidth / 2) % contentWidth;
      const activeIndex = Math.floor(normalized / itemWidth);
      runOnJS(setActiveIndex)(activeIndex);
    }
  );

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
            index={index}>
            {renderItem({ item, index })}
          </MarqueeItem>
        ))}
      </View>
    </GestureDetector>
  );
};

export default Marquee;
