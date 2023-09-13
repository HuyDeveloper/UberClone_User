import React from 'react';
import { BASE_URL } from '../../config'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import { selectUserData,selectTravelInfoUser,selectDestination,selectOrigin } from '../slices/navSlice'

const BookingRequest = async() => {
    const userData = useSelector(selectUserData)
    const travelInfoUser = useSelector(selectTravelInfoUser)
    const destination = useSelector(selectDestination)
    const origin = useSelector(selectOrigin)
    console.log(travelInfoUser)
    console.log(userData)
    console.log(destination)
    console.log(origin)
        const data = {
            pickupLocation: origin?.description,
            destination: destination?.description,
            name: userData?.name,
            phone: userData?.phone,
            typeVerhicle: travelInfoUser?.type,
        };
        fetch(`${BASE_URL}/booking/booking-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${userInfo.access_token}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('response');
                console.log(data.message);
            })
            .catch((error) => {
                console.error(error);
                alert('Error!');
            });
};
export default BookingRequest;