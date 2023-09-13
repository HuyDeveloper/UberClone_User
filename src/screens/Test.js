import React ,{useContext}from "react";
import { View,Text } from "react-native";
import { AuthContext } from '../context/AuthContext'
const Test=()=>{
    const { driverInfo } = useContext(AuthContext)
    return (<View>
        <Text>Test</Text>
        <Text>{driverInfo.phone}</Text>
        <Text>{driverInfo.name}</Text>
    </View>)
}
export default Test