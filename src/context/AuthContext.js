import React, { createContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {io} from 'socket.io-client';
const socket = io(BASE_URL)
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [profile, setProfile] = useState({});
  const [driverInfo, setDriverInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  const [dataTrip, setDataTrip] = useState({});
  const RegisterFunction = (name, phone, password, confirm_password) => {
    setIsLoading(true)
    fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        password: password,
        confirm_password: confirm_password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data.result)
        AsyncStorage.setItem('userInfo', JSON.stringify(data.result))
        setIsLoading(false)
        console.log(data.result)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }

  const login = (phone, password) => {
    setIsLoading(true);
    fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data.result);
        AsyncStorage.setItem("userInfo", JSON.stringify(data.result));
        setIsLoading(false);
        setProfile(data.user);
        AsyncStorage.setItem("profile", JSON.stringify(data.user));

        socket.on("connect", () => {
          console.log(socket.id);
        });
        console.log(`hI ${data.user.phone}`)
        socket.on(`${data.user.phone}`, (data) => {
          console.log(`Data driver: ${data.name}`)
          setDriverInfo(data);
        });
        socket.on(`${data.user.phone}driverGPS`, (data)=>{
          driverInfo.location = data.location
          setDriverInfo(driverInfo)
          console.log(data.location.coords.latitude)
        })
        socket.on("disconnect", () => {
          console.log(socket.id); // undefined
        });
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true)

    fetch(`${BASE_URL}/users/logout`, {
      method: 'POST',
      Headers: {
        Authorization: `Bearer ${userInfo.access_token}`
      },
      body: JSON.stringify({
        refresh_token: userInfo.refresh_token
      })
    })
      .then((res) => {
        console.log(res.data)
        AsyncStorage.removeItem('userInfo')
        setUserInfo({})
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfor = await AsyncStorage.getItem("userInfo");
      let profileuser = await AsyncStorage.getItem("profile");
      userInfor = JSON.parse(userInfor);
      profileuser = JSON.parse(profileuser);

      if (userInfor) {
        setUserInfo(userInfor);
        setProfile(profileuser);

        // socket.on("connect", () => {
        //   console.log(socket.id);
        // });
        console.log(`Hi ${profileuser.phone}`)
        socket.on(`${profileuser.phone}`, (data) => {
          setDriverInfo(data);
        });
        console.log(`${profileuser.phone}driverGPS`)
        // socket.on(`${profileuser.phone}driverGPS`, (data)=>{
        //   // console.log(`tao ${data.cusPhone}`)
        //   // console.log(`tao ${data.location.coords.latitude}
        //   console.log(data)
        //   console.log(`Hii ${driverInfo.cusPhone}`)
        //   driverInfo.location = data.location
        //   // setDriverInfo(driverInfo)
        //   console.log(`tao ${driverInfo.location}`)
        //   console.log(`tao ${driverInfo.cusPhone}`)
        // })
        // socket.on("disconnect", () => {
        //   console.log(socket.id); // undefined
        // });
      }

      setSplashLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const finishTrip=(navigation)=>{
    console.log(profile)
    socket.on(`${profile.phone}finishTrip`, (data)=>{
      console.log(data)
      navigation.navigate("home");
    })
  }

  useEffect(() => {
    isLoggedIn()
    
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading,
        userInfo: userInfo,
        splashLoading,
        login: login,
        isLoggedIn,
        register: RegisterFunction,
        logout, 
        driverInfo,
        finishTrip
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
