import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native'
import Separator from '../components/separators'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/home'
import RideScreen from '../screens/ride'
import CarScreen from '../screens/car'
import ProfileScreen from '../screens/profile'
import DesSearch from '../components/DesSearch'
import WaitingScreen from '../screens/WaitingScreen'

const HomeStack = createNativeStackNavigator()

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{}}>
      <HomeStack.Screen name='home' component={HomeScreen} options={{ headerShown: false }} />

      <HomeStack.Screen name='rideScreen' component={RideScreen} />
      <HomeStack.Screen name='carScreen' component={CarScreen} />
      <HomeStack.Screen name='profileScreen' component={ProfileScreen} />
      <HomeStack.Screen name='desSearch' component={DesSearch} />
      <HomeStack.Screen name='waitingScreen' options={{ headerShown: false }} component={WaitingScreen} />
    </HomeStack.Navigator>
  )
}

export default HomeStackScreen
