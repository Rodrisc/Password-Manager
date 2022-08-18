import { VStack, Text, HStack, IconButton, useTheme, Heading, Center, FlatList } from 'native-base';
import { useState, useEffect, SetStateAction, useCallback } from 'react';
import { SignOut, LockKey, Eye, EyeSlash, GearSix, EnvelopeOpen, Package, Tray, Gear } from 'phosphor-react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';


import { Button } from '../components/Button';
import { ToastAndroid } from 'react-native'

// import * as SQLite from 'expo-sqlite'

// const db = SQLite.openDatabase('db.sqlite')

import { ViewAccount, dataAccount } from '../components/viewAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../components/Loading';


export function Home() {

  const navigation = useNavigation()


  const [eye, setEye] = useState(false)

  const [accounts, setAccounts] = useState<dataAccount[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const { colors } = useTheme()


  function handleEye() {
    if (eye) {
      setEye(false)

    } else {
      setEye(true)
    }
  }

  function toast() {
    // ToastAndroid.show('Vc apertou o botão', 2000)
    navigation.navigate('register')
  }

  const getData = async () =>{
    setIsLoading(true)
    try{
      const jsonvalue = await AsyncStorage.getItem('@PasswordManager:Passwords')
      jsonvalue ? setAccounts(JSON.parse(jsonvalue)) : []
    } catch(e){
      console.log(e)
    }
    setIsLoading(false)
  }

  const getAllkeys = async () =>{
    const response = await AsyncStorage.removeItem('@PasswordManager:Passwords')
    console.log(response)
  }

  function handleOpenShowDatas(id: string){
    navigation.navigate('showdata',{ id } )
  }

  useFocusEffect(useCallback(() => {
    getData()
  }, []))

  

  return (
    <VStack flex={1} pb={6} bg="gray.700">

      <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        bg='#5C9DF2'
        pt={12}
        pb={5}
        px={6}
      >

        <HStack alignItems='center'>
          <LockKey color={colors.gray[300]} />
          <Heading color='gray.300'>
            Password Manager
          </Heading>
        </HStack>

        <IconButton
          icon={<Gear size={26} color={colors.gray[300]} />}
        />
      </HStack>

      {isLoading ? <Loading />:
      
      <VStack flex={1} px={6} >

      <HStack w='full' mt={5} mb={4} justifyContent='space-between' alignItems='center'>
        <Heading color='gray.300'>
          Minhas senhas
        </Heading>

        {/* <IconButton
          icon={eye ? <Eye size={25} color={colors.gray[300]} /> : <EyeSlash size={25} color={colors.gray[300]} />}
          onPress={handleEye}
        /> */}

        <Text color='gray.200'>{accounts.length}</Text>
      </HStack>

      <FlatList

        data={accounts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ViewAccount data={item} onPress={() => handleOpenShowDatas(item.id)} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Center>
            <Tray color={colors.gray[300]} size={40} />
            <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
              Você ainda não possui {'\n'}
              senhas salvas
            </Text>
          </Center>
        )}
      /> 
      <Button title='Adicionar nova senha' onPress={toast}
        mt={3}
      />
    </VStack>}

    </VStack>
  );
}