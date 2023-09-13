import React, { useEffect, useRef, useState } from 'react'
import { Button, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectOrigin, selectDestination, selectTravelTimeInformation } from '../slices/navSlice'
import { GOOGLE_MAPS_APIKEY } from '@env'
import MapViewDirections from 'react-native-maps-directions'
import CarSelected from '../components/CarSelected'
import MapDirection from '../components/MapDirection'

const CarScreen = () => {
  return (
    <View className='flex-1'>
      <View className='h-1/2'>
        <MapDirection />
      </View>

      <View className='h-1/2'>
        <CarSelected />
      </View>
    </View>
  )
}
export default CarScreen
