import { VStack, useTheme, Text, IPressableProps, Box, Icon } from 'native-base';
import { Header } from '../components/Header';
import { useRoute } from '@react-navigation/native'
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Loading } from '../components/Loading';

import { User, Envelope, Password } from 'phosphor-react-native';

import { useNavigation } from '@react-navigation/native';

import { dataAccount } from '../components/viewAccount';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ToastAndroid } from 'react-native';

type RouteParams = {
  id: string

}

// type Props = IPressableProps &{

// }

export function ShowDatas() {

  // 

  const navigation = useNavigation()

  const { colors } = useTheme()

  const route = useRoute()
  const [edit, setEdit] = useState(false)
  const [account, setAccount] = useState<dataAccount>()

  const [allAccounts, setAllAccounts] = useState<dataAccount[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const [identifier, setIdentifier] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { id } = route.params as RouteParams

  const getItems = async () => {

    try {

      const response = await AsyncStorage.getItem("@PasswordManager:Passwords")
      const allItens = response ? JSON.parse(response) : []
      
      const itemEspecifico = allItens.find((item: { id: any; }) => item.id === id)
      

      setIdentifier(itemEspecifico.identifier)
      setEmail(itemEspecifico.email)
      setPassword(itemEspecifico.password)

      setAccount(itemEspecifico)

      setAllAccounts(allItens)
      
    } catch (e) {
      console.log(e)
    }

    setIsLoading(false)

  }

  const handleSave = async () => {
    const newData = {
        id: account.id,
        identifier,
        email,
        password,
        colorBox: account.colorBox
      }

    const newJson = allAccounts.filter(item => item.id === id)
    
    const data = [...newJson, newData]
    
    try{
      await AsyncStorage.setItem("@PasswordManager:Passwords", JSON.stringify(data))
      ToastAndroid.show('Senha modificada com sucesso!', 2000)
      navigation.goBack()


    } catch(e){
      console.log(e)
    }

  }

  useFocusEffect(useCallback(() => {
    getItems()
  }, []))

  
  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <Box>
        <Header title={'Editar'} pr={6} />
      </Box>

      {isLoading ?
        <Loading /> :
        <VStack p={3} flex={1} justifyContent='center'>
          <Input h={60} mb={5} bg='gray.800' value={identifier} InputLeftElement={<Icon as={<User color={colors.gray[300]} />} m={3} />} placeholder='Identificador' placeholderTextColor='gray.500' color='gray.300' onChangeText={setIdentifier} />
          <Input h={60} mb={5} bg='gray.800' value={email} InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} m={3} />} placeholder='E-mail' placeholderTextColor='gray.500' color='gray.300' onChangeText={setEmail} />
          <Input h={60} mb={5} bg='gray.800' value={password} InputLeftElement={<Icon as={<Password color={colors.gray[300]} />} m={3} />} placeholder='Senha' placeholderTextColor='gray.500' color='gray.300' onChangeText={setPassword} />

          <Button title={'Salvar'} onPress={handleSave}/>


        </VStack>
      }
    </VStack>
  )
}