import React, { useState, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

const SearchBar = () => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity classname='' onPress={() => navigation.navigate('desSearch')}>
      <View className='p-2 pl-6 pb-2 pt-2 bg-gray-300 m-2 flex-row'>
        <View className='mt-1'>
          <AntDesign name='search1' size={24} color='black' />
        </View>
        <Text className='ml-2 text-lg font-normal'> Search Destinations</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SearchBar
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    height: 300,
    width: 300
  },
  map: {
    flex: 1
  }
})
