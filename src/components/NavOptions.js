import React from 'react'
import { Touchable } from 'react-native'
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const data = [
  {
    id: '123',
    title: 'Get a GoRide',
    image: 'https://cdn.honda.com.vn/motorbikes/December2022/3C0atxHao3Fpr79jsnVl.jpg',
    screen: 'rideScreen'
  },
  {
    id: '456',
    title: 'Get a GoCar',
    image: 'https://links.papareact.com/3pn',
    screen: 'desSearch'
  }
]
const NavOptions = () => {
  const navigation = useNavigation()
  return (
    <FlatList
      className='mt-5'
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
          <View className='p-2 pl-6 pb-8 pt-4 bg-gray-200 m-3 w-40'>
            <Image className='w-32 h-32' source={{ uri: item.image }} resizeMode='contain'></Image>
            <Text className='ml-2 text-lg font-semibold'>{item.title}</Text>
            <View className='p-2 bg-black rounded-full w-10 mt-4'>
              <AntDesign name='arrowright' size={24} color='white' />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}
export default NavOptions
