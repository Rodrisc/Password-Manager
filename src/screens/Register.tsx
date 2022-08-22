
import { Header } from '../components/Header';
import { Box, Center, Icon, IconButton, Select, useTheme, VStack } from 'native-base';
import { CaretLeft, Envelope, Password, User, UserCirclePlus } from 'phosphor-react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { ToastAndroid } from 'react-native';

// import * as SQLite from 'expo-sqlite'


// const db = SQLite.openDatabase('db.sqlite')



export function Register() {

  const [identifier, setIdetifier] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [colorBox, setColorBox] = useState('#5C9DF2')



  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()

  const { colors } = useTheme()

  async function handleNewAccount() {

    setIsLoading(true)

    const id = uuid.v4()

    const newData = {
      id,
      identifier,
      email,
      password,
      colorBox
    }

    const response = await AsyncStorage.getItem("@PasswordManager:Passwords")
    const respondeData = response ? JSON.parse(response) : []

    const data = [...respondeData, newData]

    try {
      await AsyncStorage.setItem('@PasswordManager:Passwords', JSON.stringify(data))
      navigation.goBack()
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }

    ToastAndroid.show('Cadastrado com sucesso!', 2000)


  }

  console.log(colorBox)

  return (
    <VStack flex={1} pb={6} bg="gray.700" >


      <Box pl={3} pr={7} bg='#5C9DF2' mb={10}>
        <Header title='Nova conta' />
      </Box>

      <VStack flex={1} p={3}>
        <Center mb={10}>
          <UserCirclePlus size={120} color='#5C9DF2' />
        </Center>

        <Input h={60} mb={5} bg='gray.800' InputLeftElement={<Icon as={<User color={colors.gray[300]} />} m={3} />} placeholder='Identificador' placeholderTextColor='gray.500' color='gray.300' onChangeText={setIdetifier} />
        <Input h={60} mb={5} bg='gray.800' InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} m={3} />} placeholder='E-mail' placeholderTextColor='gray.500' color='gray.300' onChangeText={setEmail} />
        <Input h={60} mb={5} bg='gray.800' InputLeftElement={<Icon as={<Password color={colors.gray[300]} />} m={3} />} placeholder='Senha' placeholderTextColor='gray.500' color='gray.300' onChangeText={setPassword} />

        <Box bg='gray.600'>
          <Select selectedValue={colorBox}
            placeholder='Selecione uma categoria'
            h={60}
            borderRadius='md'
            color='gray.300'
            _selectedItem={{
              bg: 'blue.200',
              borderRadius: 'full',

            }} onValueChange={itemValue => setColorBox(itemValue)}>
            <Select.Item label="Redes Sociais" value='#00f' />
            <Select.Item label='Contas Bancárias' value='#f00' />
            <Select.Item label='Games' value='#f0f' />
            <Select.Item label='Outros' value='#fff' />
          </Select>

        </Box>

        <Button title='Salvar' mt={10} isLoading={isLoading} onPress={handleNewAccount} />
      </VStack>

    </VStack>
  );
}