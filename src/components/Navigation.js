import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/Login.screen'
import RegisterScreen from '../screens/Register.screen'
import { AuthContext } from '../context/AuthContext'
import SplashScreen from '../screens/splash.screen'
import Home from '../routes/homeStack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import Setting from '../routes/settingStack'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext)
  if(userInfo.access_token==null){
    console.log("Info User:"+userInfo.access_token)
  }
  return (
    <NavigationContainer>
      {splashLoading ? (
        <Stack.Navigator>
          <Stack.Screen name='Splash Screen' component={SplashScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : userInfo.access_token ? (
        <Tab.Navigator
          initialRouteName='Home'
          screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarInActiveTintColor: 'grey',
            headerShown: false
          }}
        >
          <Tab.Screen
            name='Home'
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => <AntDesign name='home' color={focused ? 'tomato' : 'grey'} size={25} />,
              tabBarLabel: 'Home'
            }}
          />
          <Tab.Screen
            name='Settings'
            component={Setting}
            options={{
              tabBarIcon: ({ focused }) => <Feather name='settings' color={focused ? 'tomato' : 'grey'} size={25} />,
              tabBarLabel: 'Setting'
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default Navigation
