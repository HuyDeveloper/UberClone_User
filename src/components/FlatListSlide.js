import React from 'react'
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { FlatListSlider } from 'react-native-flatlist-slider'

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    desc: 'Silent Waters in the mountains in midst of Himilayas',
    screen: 'rideScreen'
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
    screen: 'rideScreen'
  }
]
const FlatListSlide = () => {
  const navigation = useNavigation()
  return (
    <View>
      <FlatListSlider
        data={data}
        width={275}
        timer={3000}
        //component={<Text>hello </Text>}
        indicator
        loop={false}
        autoscroll={false}
        onPress={() => null}
        //onPress={item => alert(JSON.stringify(item))}
        indicatorActiveWidth={30}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        separatorWidth={15}
        indicatorInActiveColor={'#ffffff'}
      />
    </View>
  )
}
export default FlatListSlide
