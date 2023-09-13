import React, { useContext } from 'react'
import { Button, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Touchable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from "../context/AuthContext";
import { NavigationAction } from 'react-navigation'
import { useDispatch } from 'react-redux'
import { setUserData } from '../slices/navSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
const UserData=  async ()=> {
    const dispatch = useDispatch()
    const { profile, logout } = useContext(AuthContext);
    let profileuser = await AsyncStorage.getItem("profile");
    profileuser = JSON.parse(profileuser);
    const phone = profileuser.phone;
    const name = profileuser.name;
    dispatch(setUserData({
        name: name,
        phone: phone,
    }))
    console.log(profileuser.phone)
  
}
export default UserData
