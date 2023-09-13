import React, { useEffect, useRef, useState } from 'react'
import { Button, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectOrigin, selectDestination, selectTravelTimeInformation } from '../slices/navSlice'
import { ACCESS_TOKEN } from '@env'
import MapViewDirections from 'react-native-maps-directions'
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

const MapDirection = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const desQuery = destination.location[0] + ',' + destination.location[1] || '106.653805,10.797979'
  const oriQuery = origin.location[0] + ',' + origin.location[1] || '106.653805,10.797980'

  const [show, setShow] = useState(false)
  const [data, setData] = useState([])
  const baseURL = 'https://api.mapbox.com/directions/v5/mapbox/driving'
  const [coordinates, setCoordinates] = useState([])
  console.log('MapDi' + origin?.location)
  console.log('MapDi' + destination?.location)
  const mapRef = useRef()

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
      setCoordinates(decodedCoordinates)
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

  useEffect(() => {
    getRoute()

    console.log(coordinates)
    if (!origin || !destination) return
    //zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
    })
  }, [origin, destination, show])

  return (
    <View className='flex-1'>
      <MapView
        ref={mapRef}
        className='h-full'
        mapType='mutedStandard'
        initialRegion={{
          latitude: origin?.location[1],
          longitude: origin?.location[0],
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
      >
        {/* {origin &&destination&&(<MapViewDirections
          origin={{ latitude: origin.location[1], longitude: origin.location[0] }}
          destination={{ latitude: destination.location[1], longitude: destination.location[0] }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor='black'
        />)} */}
        <Polyline
          coordinates={coordinates}
          strokeColor='#000' // fallback for when `strokeColors` is not supported by the map-provider
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
        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location[1],
              longitude: destination.location[0]
            }}
            title='Destination'
            description={destination.description[0]}
            identifier='destination'
            pinColor='green'
          />
        )}
      </MapView>
    </View>
  )
}
export default MapDirection
