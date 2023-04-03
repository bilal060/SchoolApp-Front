import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Root from './src/routing/Root'
import Auth from './src/routing/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from './src/redux/actions/Global.action'
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const App = () => {
  const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true  })

 

  const dispatch = useDispatch()
  useEffect(() => {
    
      dispatch(getCountries());

  }, []);
  useEffect(async() => {

    rnBiometrics.isSensorAvailable()
  .then((resultObject) => {
    const { available, biometryType } = resultObject
    console.log("🚀 ~ file: App.js:23 ~ .then ~ biometryType:", biometryType , available)

    if (available && biometryType === BiometryTypes.TouchID) {
      console.log('TouchID is supported')
    } else if (available && biometryType === BiometryTypes.FaceID) {
      console.log('FaceID is supported' )
    } else if (available && biometryType === BiometryTypes.Biometrics) {
      console.log('Biometrics is supported' , BiometryTypes.FaceID)
    } else {
      console.log('Biometrics not supported')
    }
  })

  
  

  }, []);
  

  const reduxState = useSelector(({auth, global}) => {
    return {
      isLoggIn: auth.isLoggedIn,
    };
  });
  return (
      
      !reduxState?.isLoggIn  ?  <Auth /> : <Root/>  
  )
}

export default App

const styles = StyleSheet.create({})