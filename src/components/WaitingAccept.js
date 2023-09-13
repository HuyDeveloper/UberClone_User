import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { selectTravelInfoUser, selectOrigin, selectDestination } from '../slices/navSlice'
import AntDesgin from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Separator from './separators'
//import PushRequest from './PushRequest'
//import BookingRequest from './BookingRequest'
//import { AuthContext } from '../context/AuthContext'
const WaitingAccept = () => {
  const travelInfoUser = useSelector(selectTravelInfoUser)
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  console.log(travelInfoUser)
  //BookingRequest()

  //const { driverInfo } = useContext(AuthContext)
  
  return (
    <View>
      
        <View className=''>
          <Text className='font-semibold text-center text-2xl'>Waiting...</Text>
          <Text className='text-xl font-semibold text-center'>Driver is on the way ({travelInfoUser.type})</Text>
          <Text className='text-3xl font-semibold text-center '>{travelInfoUser.price}</Text>
          <Separator />
          <View className='flex-row my-1 py-1 mx-3'>
            <AntDesgin name='clockcircle' size={24} color='black' />
            <Text className='text-lg font-semibold mx-5'>
              {travelInfoUser.time} min ({travelInfoUser.distance} km) total
            </Text>
          </View>
          <Separator />
          <View className='flex-row my-1 py-1 mx-3'>
            <Entypo name='location' size={24} color='black' />
            <Text className='text-lg font-semibold mx-5'>{origin.description}</Text>
          </View>
          <View className='flex-row my-1 py-1 mx-3'>
            <MaterialIcons name='location-city' size={24} color='black' />
            <Text className='text-lg font-semibold mx-5'>{destination.description}</Text>
          </View>
        </View>
    
    </View>
  )
}
export default WaitingAccept // Path: Uber_Clone_Go\src\components\WaitingAccept.js
