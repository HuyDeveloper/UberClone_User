import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import {
  Button,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView
} from 'react-native'

import { TextInput } from 'react-native-gesture-handler'
import Separator from '../components/separators'
import NavOptions from '../components/NavOptions'
import NavFavourites from '../components/NavFavourites'
import FlatListSlide from '../components/FlatListSlide'
import SearchBar from '../components/SearchBar'
import UserLocation from '../components/UserLocation'
import UserData from '../components/UserData'

function HomeScreen({ navigation }) {
  UserData()
  return (
    <SafeAreaView>
      <View className='flex-row pb-3 items-center mx-4 space-x-2 mt-8 px-1'>
        <Image
          source={{ uri: 'https://lelogama.go-jek.com/component/factsheet/icon/2_4.54.18_PM.jpg' }}
          className='h-10 w-10 bg-gray-300 p-4 rounded-full'
        />

        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Grab now</Text>
          <Text className='font-bold text-xl'>
            Current Location
            <AntDesign name='caretdown' size={15} color='black' />
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('profileScreen')}>
          <AntDesign name='user' size={30} color='black' />
        </TouchableOpacity>
      </View>
      {/* {Search} */}
      <SearchBar />

      {/* <View>
        <View className='flex-row space-x-2 bg-gray-200 p-3 mx-2'>
          <AntDesign name='search1' size={30} color='black' />
          <TextInput placeholder='Find your destination'></TextInput>
        </View>
      </View> */}
      <Separator />

      <NavOptions />
      <NavFavourites />
      {/* <UserLocation /> */}
      <FlatListSlide />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly'
  }
})

export default HomeScreen
