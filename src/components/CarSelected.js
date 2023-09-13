import React, { useState } from 'react'
import { Button, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import DistanceMatrix from './DistanceMatrix'
import tw from 'twrnc'
import { useDispatch } from 'react-redux'
import { setTravelInfoUser } from '../slices/navSlice'

const data = [
  {
    id: 'Moptorbike-123',
    title: 'Motorbike',
    multiplier: 1,
    image: 'https://cdn.honda.com.vn/motorbikes/December2022/3C0atxHao3Fpr79jsnVl.jpg'
  },
  {
    id: 'Uber-XL-456',
    title: 'Car 4 seats',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8'
  },
  {
    id: 'Uber-LUX-789',
    title: 'Car 7 seats',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf'
  }
]

const CarSelected = () => {
  DistanceMatrix()
  const travelTimeInformation = useSelector(selectTravelTimeInformation)
  console.log(travelTimeInformation)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [selected, setSelected] = useState(null)
  const distance = parseFloat((travelTimeInformation?.distance / 1000).toString()).toFixed(2)
  const time = parseFloat((travelTimeInformation?.duration / 60).toString()).toFixed(1)

  // distance=parseFloat(distance)
  console.log(distance)

  return (
    <View className='flex-1'>
      <Text className='text-center py-3 text-xl'> Select A Ride - {distance}KM</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-8 ${id === selected?.id && 'bg-gray-200'}`}
            onPress={() => {
              dispatch(
                setTravelInfoUser({
                  distance: distance,
                  time: time,
                  price: new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    maximumFractionDigits: 9
                  }).format(distance * 5000 * multiplier),
                  type: title
                })
              )
              setSelected(item)
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain'
              }}
              source={{ uri: image }}
            />
            <View className='ml-6'>
              <Text className='text-xl font-semibold'>{title}</Text>
              <Text>{time} mins</Text>
            </View>
            <Text className='text-xl '>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 9 }).format(
                distance * 5000 * multiplier
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View className='mt-auto border-t border-gray-200'>
        <TouchableOpacity
          style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}
          disabled={!selected}
          onPress={() => navigation.navigate('waitingScreen')}
        >
          <Text className='text-center text-white text-xl'>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default CarSelected
