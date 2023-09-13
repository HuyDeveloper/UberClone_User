import React from 'react'
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

const data = [
  {
    id: '123',
    icon: 'home',
    location: 'Home',
    destination: 'Tan Binh, TP.HCM, VN'
  },
  {
    id: '456',
    icon: 'school',
    location: 'School',
    destination: 'Q5, TP.HCM, VN'
  }
]
const NavFavourites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity className='flex-row items-center p-5'>
          <View className='mr-4 rounded-full bg-gray-300 p-3'>
            <Ionicons name={item.icon} size={24} color='black' />
          </View>
          <View>
            <Text>{item.location}</Text>
            <Text>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    ></FlatList>
  )
}
export default NavFavourites
