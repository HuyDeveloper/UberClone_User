import React, { useState, useEffect } from 'react'
import { ACCESS_TOKEN } from '@env'
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
import Ionicon from 'react-native-vector-icons/Ionicons'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'
import OriginSearch from './OriginSearch'

const DesSearch = () => {
  const origin = useSelector(selectOrigin)
  console.log(origin)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')

  const getMaps = async () => {
    const limit = `limit=5`
    const baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const proximity = `proximity=106.65808,10.817548`
    try {
      const response = await fetch(
        `${baseURL}${query}.json?${limit}&country=vn&${proximity}&access_token=${ACCESS_TOKEN}`
      )
      const json = await response.json()
      setData(json.features)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMaps()
  }, [query])

  return (
    <View classname='flex-1'>
      <OriginSearch />

      <View className='ml-8 flex-row'>
        <FontAwesome name='long-arrow-up' size={24} color='black' />
        <FontAwesome name='long-arrow-down' size={24} color='black' />
      </View>

      <View className='p-2 pl-6 pb-2 pt-2 bg-gray-300 m-2 flex-row'>
        <View className='mt-1'>
          <Ionicon name='location-sharp' size={24} color='green' />
        </View>
        <TextInput
          className='ml-2 text-lg font-semibold'
          placeholder='To...'
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          className='border-solid border-2 mx-2 mb-1'
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  setDestination({
                    location: item.geometry.coordinates,
                    description: item.place_name
                  })
                )
                setQuery(item.text)
                console.log(item.geometry.coordinates)
                navigation.navigate('carScreen')
              }}
            >
              <View className='p-2 pl-6 pb-2 pt-2 bg-white border-b-2 '>
                <Text>{item.place_name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

export default DesSearch
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
