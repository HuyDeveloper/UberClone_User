import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const UserLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      
      } catch (error) {
        setError(error.message);
      }
    };

    getLocation();
  }, []);
  if(location){
    console.log(location)
  }else{
    console.log('no location')
  }

  return (
    <View>
      {location ? (
        <Text>
          Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
        </Text>
      ) : (
        <Text>Loading location...</Text>
      )}
      {error && <Text>Error: {error}</Text>}
    </View>
  );
};

export default UserLocation;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent:'flex-end'
  },
  btn:{
    display:'flex',
    flexDirection:'column',
    padding:10,
  },
  input: {
    marginTop: 50,
    borderRadius: 20,
    marginBottom: 10,
    borderColor: '#555',
    fontSize: 20,
    backgroundColor: '#fff',
    textAlign: 'auto',
    width: 330,
    borderWidth: 1,
    height: 60,
    padding: 20
  },
  text: {
    color: '#fff',
  }
})