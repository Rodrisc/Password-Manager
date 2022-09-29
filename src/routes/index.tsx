import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes';

import * as LocalAuthentication from 'expo-local-authentication'
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../components/Loading';

import { BackHandler, ToastAndroid } from 'react-native'
import { Login } from '../screens/Login';



export function Routes() {

  const [isBiometricSupported, setIsBiometricSupported] = useState(false)
  const [isAuthenticate, setIsAlthenticate] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  

  function onAuthenticate() {

    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: 'Autenticação',
      fallbackLabel: 'Entre com a senha',
      
    }).then(result => {
      if(!result.success){
        ToastAndroid.show('Não foi possível acessar o App! Use/Habilite as credênciais do dispositivo!', 2000)
        // BackHandler.exitApp()
      }
      setIsAlthenticate(result.success)
      
    })
  }

  const verifyCompatibility = async () => {

    try {
      const compatible = await LocalAuthentication.hasHardwareAsync()
      setIsBiometricSupported(compatible)
    } catch (e) {
      console.log(e)
    }

  }

  const verifyAsyncStorage = async () => {
    
    try{
      const response = await AsyncStorage.getItem("@PasswordManager:Security")
      
      if(!response){
        setIsLoading(false)
        setIsAlthenticate(true)
      } else{
        setIsLoading(false)
        onAuthenticate()
      }
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {

    verifyCompatibility()
    verifyAsyncStorage()

    if(!setIsAlthenticate){
      onAuthenticate()
    }
  }, [])

  

  if(isLoading){
    return(<Loading/> )
  }

  return (
    <NavigationContainer>
      {isAuthenticate ?
        <AppRoutes /> : <Login authenticate={verifyAsyncStorage}/>
      }
    </NavigationContainer>
  );
}