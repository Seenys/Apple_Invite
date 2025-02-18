import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';

const EventCard = ({ event }: { event: any }) => {
  return (
    <View className="h-full w-full justify-center overflow-hidden  rounded-3xl shadow-lg shadow-black">
      <Image source={event.image} className=" absolute h-full w-full" />
      <View className="absolute bottom-0 h-1/3 w-full items-center justify-center p-4">
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,8)']}
          style={StyleSheet.absoluteFill}
        />
        <Text className="text-3xl font-bold text-white">{event.name}</Text>
      </View>
    </View>
  );
};

export default EventCard;
