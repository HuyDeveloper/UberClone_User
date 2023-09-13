import React, { useState, useContext } from 'react'
import { View, StyleSheet, Text, Image, TextInput, Alert, TouchableOpacity } from 'react-native'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
function Register({ navigation }) {
  const [phone, setPhone] = useState(null)
  const [name, setName] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

  const { isLoading, register } = useContext(AuthContext)
  console.log(typeof RegisterFunction)

  const setData = () => {
    if (phone.length == 0 || password.length == 0) {
      Alert.alert('Error!', 'Your informations is not invalid')
    } else {
      register(name, phone, password, confirmPassword)
    }
  }
  return (
    <View style={styles.body}>
      <Spinner visible={isLoading} />
      <Image style={styles.logo} source={require('../../assets/logo/logo1.png')} />
      <TextInput
        style={styles.input}
        placeholder='Phone number'
        onChangeText={(value) => {
          setPhone(value)
        }}
      />
      <TextInput
        style={styles.input}
        placeholder='Full Name'
        onChangeText={(value) => {
          setName(value)
        }}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder='Password'
        onChangeText={(value) => {
          setPassword(value)
        }}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder='Confirm Password'
        onChangeText={(value) => {
          setConfirmPassword(value)
        }}
      />
      <Button title='Register' color='#33CCFF' onPressFunction={setData} />
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text>Have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login')
          }}
        >
          <Text style={{ color: '#347deb' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    width: 380,
    height: 120,
    margin: 20,
    marginBottom: 50,
    marginTop: 180
  },
  text: {
    fontSize: 30,
    color: '#333'
  },
  input: {
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
  }
})
