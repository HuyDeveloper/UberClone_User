import React, { useContext } from 'react'
import { Button, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Touchable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from "../context/AuthContext";
import { NavigationAction } from 'react-navigation'
import ProfileList from '../components/ProfileList'
import { useSelector } from 'react-redux'
import { selectUserData } from '../slices/navSlice'

const ProfileScreen=  ()=> {
  const userDb = useSelector(selectUserData)
  console.log(userDb)
  const { profile, logout } = useContext(AuthContext);
  return (
    <View className='flex-1'>
      <View className='flex-row items-center mt-5'>
        <View className='mx-4 rounded-full bg-gray-300 p-3'>
          <Text className='text-lg font-semibold'>QH</Text>
        </View>
        <View>
          <Text className='font-bold text-lg'>{userDb?.name}</Text>
          <Text>{userDb?.phone}</Text>
          <Text>{userDb?.name}@gmail.com</Text>
        </View>
        <View className='ml-20'>
          <TouchableOpacity onPress={() => navigation.navigate('rideScreen')}>
            <FontAwesome5 name='pencil-alt' size={24} color='black' />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text className='text-xl font-semibold mx-2 my-3'>My Account</Text>
      </View>
      
      <ProfileList />

      <View className='p-5'>
        <Button  title='Log out' onPress={() => logout()} />
      </View>
      
    </View>
  )
}
export default ProfileScreen
