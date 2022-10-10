import { VStack, useTheme, Box, Icon, Center, ScrollView } from 'native-base';
import { Header } from '../components/Header';
import { useRoute } from '@react-navigation/native'
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Loading } from '../components/Loading';

import { User, Envelope, Password, IdentificationCard, Eye, EyeSlash, UserCirclePlus, UserCircleGear } from 'phosphor-react-native';

import { useNavigation } from '@react-navigation/native';

import { dataAccount } from '../components/viewAccount';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ToastAndroid, Alert, TouchableOpacity } from 'react-native';

type RouteParams = {
  id: string
}

export function ShowDatas() {


  const navigation = useNavigation()

  const { colors } = useTheme()

  const route = useRoute()
  // const [edit, setEdit] = useState(false)
  const [account, setAccount] = useState<dataAccount>()

  const [allAccounts, setAllAccounts] = useState<dataAccount[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [ButtonLoading, setButtonLoading] = useState(false)

  const [identifier, setIdentifier] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [requiredFiel, setRequiredFiel] = useState('')

  const [hidePassword, setHidePassword] = useState(true)

  const { id } = route.params as RouteParams

  const Delete = async () => {
    try {
      const newJson = allAccounts.filter(item => item.id != id)
      await AsyncStorage.setItem("@PasswordManager:Passwords", JSON.stringify(newJson))
    } catch (e) {
      console.log(e)
    }
    ToastAndroid.show('Senha apagada com sucesso!', 2000)
    navigation.goBack()
  }

  const getItems = async () => {

    try {

      const response = await AsyncStorage.getItem("@PasswordManager:Passwords")
      const allItens = response ? JSON.parse(response) : []

      const item = allItens.find((item: { id: any; }) => item.id === id)

      setIdentifier(item.identifier)
      setEmail(item.email)
      setPassword(item.password)
      setUser(item.user)
      setAccount(item)
      setAllAccounts(allItens)

    } catch (e) {
      console.log(e)
    }

    setIsLoading(false)

  }

  const handleSave = async () => {

    const verify = verifyInputs()

    if (verify) {
      verifyInputs()

      setButtonLoading(true)

      const newData = {
        id: account.id,
        identifier,
        user,
        email,
        password,
        colorBox: account.colorBox
      }

      const newJson = allAccounts.filter(item => item.id != id)
      const data = [...newJson, newData]

      try {
        await AsyncStorage.setItem("@PasswordManager:Passwords", JSON.stringify(data))
        ToastAndroid.show('Senha modificada com sucesso!', 2000)
        navigation.goBack()

      } catch (e) {
        console.log(e)
        setButtonLoading(false)
      }
    }

  }

  const handleDelete = () => {

    return Alert.alert(
      'Apagar',
      'Deseja realmente apagar essa senha?',
      [
        {
          text: 'Cancelar',
          onPress: () => setButtonLoading(false)
        }, {
          text: 'Apagar',
          onPress: () => Delete()
        }
      ]
    )
  }

  const verifyInputs = () => {
    if (!identifier || !password) {
      setRequiredFiel('red.400')
      return Alert.alert('Entrada', 'Campos em vermelho são obrigatórios')
    }
    return true
  }

  useFocusEffect(useCallback(() => {
    getItems()
  }, []))


  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <Box>
        <Header title={'Editar'} pr={6} />
      </Box>

      <ScrollView>

        <Center mb={5} pt={3}>
          <UserCircleGear size={120} color='#5C9DF2' />
        </Center>

        {isLoading ?
          <Loading /> :
          <VStack p={3} flex={1} justifyContent='center'>
            <Input autoCapitalize='words' h={60} mb={5} bg='gray.800' value={identifier} InputLeftElement={<Icon as={<IdentificationCard color={colors.gray[300]} />} m={3} />} placeholder='Identificador' placeholderTextColor='gray.500' borderBottomColor={requiredFiel} color='gray.300' onChangeText={setIdentifier} />
            <Input h={60} mb={5} bg='gray.800' value={user} InputLeftElement={<Icon as={<User color={colors.gray[300]} />} m={3} />} placeholder='Usuário' placeholderTextColor='gray.500' color='gray.300' onChangeText={setUser} />
            <Input h={60} mb={5} bg='gray.800' value={email} InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} m={3} />} placeholder='E-mail' placeholderTextColor='gray.500' color='gray.300' onChangeText={setEmail} />
            <Input h={60} mb={5} bg='gray.800' value={password} InputLeftElement={<Icon as={<Password color={colors.gray[300]} />} m={3} />} placeholder='Senha' placeholderTextColor='gray.500' borderBottomColor={requiredFiel} color='gray.300' onChangeText={setPassword} type={hidePassword ? 'password' : 'text'}
              InputRightElement={<TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={{ marginRight: 15 }}>
                {hidePassword ? <Eye color={colors.gray[300]} /> : <EyeSlash color={colors.gray[300]} />}
              </TouchableOpacity>} />

            <Button title={'Salvar'} onPress={handleSave} mb={5} isLoading={ButtonLoading} />
            <Button title='Apagar' bg='red.500' _pressed={{ bg: 'red.800' }} onPress={handleDelete} />

          </VStack>
        }
      </ScrollView>
    </VStack>
  )
}