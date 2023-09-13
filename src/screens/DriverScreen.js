import React, { useEffect, useRef, useState ,useContext} from 'react'
import { Button, Text, View, TouchableOpacity, Image, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import MapDirection from '../components/MapDirection'
import { selectOrigin, selectDestination, selectTravelTimeInformation } from '../slices/navSlice'
import WaitingAccept from '../components/WaitingAccept'
import { AuthContext } from '../context/AuthContext'
import {ACCESS_TOKEN} from '@env'
import { Polyline } from 'react-native-maps'

const decodePolyline = (polyline) => {
    let index = 0,
      lat = 0,
      lng = 0,
      coordinates = []
  
    while (index < polyline.length) {
      let shift = 0,
        result = 0,
        byte
  
      do {
        byte = polyline.charCodeAt(index++) - 63
        result |= (byte & 0x1f) << shift
        shift += 5
      } while (byte >= 0x20)
  
      let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1
      lat += dlat
  
      shift = 0
      result = 0
  
      do {
        byte = polyline.charCodeAt(index++) - 63
        result |= (byte & 0x1f) << shift
        shift += 5
      } while (byte >= 0x20)
  
      let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1
      lng += dlng
  
      coordinates.push({ latitude: lat * 1e-5, longitude: lng * 1e-5 })
    }
  
    return coordinates
  }


const DriverScreen = () => {
    const navigation = useNavigation()
    const origin = useSelector(selectOrigin)
    const baseURL = 'https://api.mapbox.com/directions/v5/mapbox/driving'
    const [coordinatesPath, setCoordinatesPath] = useState([])
    const [show, setShow] = useState(false)
    const { driverInfo, finishTrip } = useContext(AuthContext)
    const desQuery = driverInfo?.location?.coords.longitude + ',' + driverInfo?.location?.coords.latitude || '106.653805,10.797979'
    console.log("Driver location:"+desQuery)
    const oriQuery = origin.location[0] + ',' + origin.location[1] || '106.653805,10.797980'
    const mapRef = useRef()
    finishTrip(navigation)
  
    const getRoute = async () => {
      try {
        const response = await fetch(
          // `${baseURL}${queryOri}.json?${limit}&country=vn&${proximity}&access_token=${ACCESS_TOKEN}`
          `${baseURL}/${oriQuery};${desQuery}?access_token=${ACCESS_TOKEN}`
        )
        const data = await response.json()
        const route = data.routes[0]
        const routeCoordinates = route.geometry
        // console.log(routeCoordinates);
        const decodedCoordinates = decodePolyline(routeCoordinates)
        setCoordinatesPath(decodedCoordinates)
      } catch (error) {
        console.error(error)
      } finally {
      }
    }
    useEffect(() => {
      getRoute()
  
      console.log(coordinatesPath)
      if (!origin || !driverInfo?.location) return
      //zoom & fit to markers
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 300, right: 50, bottom: 250, left: 50 }
      })
    }, [origin, driverInfo.location,show])
  return (
    <View style={styles.container}>
      <MapView
       ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: origin?.location[1],
          longitude: origin?.location[0],
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
      >
        <Polyline
           coordinates={coordinatesPath}
           strokeColor='#1A96F6' // fallback for when `strokeColors` is not supported by the map-provider
           strokeWidth={6}
         />
        {origin?.location && (
          <Marker
          onPress={() => setShow(!show)}
            coordinate={{
              latitude: origin.location[1],
              longitude: origin.location[0]
            }}
            title='Origin'
            description={origin.description}
            identifier='origin'
          />
        )}
    
        {driverInfo?.location && (
          <Marker
          coordinate={{
            latitude: driverInfo.location.coords.latitude,
            longitude: driverInfo.location.coords.longitude
          }}
          title='Destination'
          description={origin.description}
          identifier='destination'
          >
             <Image source={require('../images/car-flat.png')} style={{height: 40, width: 35 }} />
          </Marker>
        
          )}
      </MapView>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcon className='mx-5 my-10' name='arrow-back-ios' size={37} color='black' />
      </TouchableOpacity>
      <View className='border-solid border-2 mx-2 absolute bottom-5 left-0 right-0 bg-[#eff8f3] flex-row'>
        <View className='py-1'>
            <Image
              style={{
                width: 100,
                height: 75,
                resizeMode: 'contain',
           
              }}
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/147/147142.png' }}
            />
        </View>

        <View>
            
            <Text className='text-2xl font-semibold ml-2'>Name: {driverInfo?.name}</Text>
            <Text className='text-2xl font-semibold ml-2'>Phone: {driverInfo?.phone}</Text>
        </View>
    
      </View>
      {/* Other components */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
export default DriverScreen

