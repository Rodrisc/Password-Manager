
import { Header } from '../components/Header';
import { Box, Center, Icon, ScrollView, Select, useTheme, VStack } from 'native-base';
import { Envelope, Eye, IdentificationCard, EyeSlash, Password, User, UserCirclePlus } from 'phosphor-react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import uuid from 'react-native-uuid'

import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { ToastAndroid, Alert, TouchableOpacity } from 'react-native';

import PasswordServices from '../services/password.services';
import { Password as passwordClass } from '../models/password.model';

export function Register() {

  const [identifier, setIdetifier] = useState('')
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [colorBox, setColorBox] = useState('#5C9DF2')
  const [isLoading, setIsLoading] = useState(false)
  const [hidePassword, setHidPassword] = useState(true)
  const [requiredFiel, setRequiredFiel] = useState('')

  const navigation = useNavigation()
  const { colors } = useTheme()

  const pServices = new PasswordServices()

  async function handleNewAccount() {

    const verify = verifyInputs()

    if (verify) {
      setIsLoading(true)
      const id = uuid.v4()
      const newData: any = {
        id,
        identifier,
        user,
        email,
        password,
        colorBox
      }

      try {
        const newPassword = new passwordClass(newData)
        pServices.insertPassowrd(newPassword)
        ToastAndroid.show('Cadastrado com sucesso!', 2000)
      } catch (error) {
        console.log('Erro ao salvar', error)
        ToastAndroid.show('Erro ao salvar', 2000)
      }

      navigation.goBack()
    }

  }

  const verifyInputs = () => {
    if (!identifier || !password) {
      setRequiredFiel('red.400')
      return Alert.alert('Entrada', 'Campos em vermelho são obrigatórios')
    }
    return true
  }

  return (
    <VStack flex={1} bg="gray.700" >


      <Box pl={3} pr={7} bg='#5C9DF2' >
        <Header title='Nova conta' />
      </Box>

      <ScrollView>
        <VStack flex={1} p={3}>
          <Center mb={5}>
            <UserCirclePlus size={120} color='#5C9DF2' />
          </Center>

          <Input autoCapitalize='words' h={60} mb={5} bg='gray.800' InputLeftElement={<Icon as={<IdentificationCard
            color={colors.gray[300]} />} m={3} />} placeholder='Identificador' placeholderTextColor='gray.500'
            color='gray.300' onChangeText={setIdetifier} borderBottomColor={requiredFiel} />

          <Input h={60} mb={5} bg='gray.800' InputLeftElement={<Icon as={<User color={colors.gray[300]} />} m={3} />}
            placeholder='Nome de usuário' placeholderTextColor='gray.500' color='gray.300' onChangeText={setUser} />

          <Input h={60} mb={5} bg='gray.800' InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />}
            m={3} />} placeholder='E-mail' placeholderTextColor='gray.500' color='gray.300' onChangeText={setEmail} />

          <Input type={hidePassword ? 'password' : 'text'} h={60} mb={5} bg='gray.800'
            InputLeftElement={<Icon as={<Password color={colors.gray[300]} />} m={3} />} placeholder='Senha'
            placeholderTextColor='gray.500' color='gray.300' onChangeText={setPassword} borderBottomColor={requiredFiel}
            InputRightElement={<TouchableOpacity onPress={() => setHidPassword(!hidePassword)} style={{ marginRight: 15 }}>
              {hidePassword ? <Eye color={colors.gray[300]} /> : <EyeSlash color={colors.gray[300]} />}
            </TouchableOpacity>}
          />

          <Box bg='gray.600'>
            <Select selectedValue={colorBox}
              placeholder='Selecione uma categoria'
              h={60}
              borderRadius='md'
              color='gray.300'
              _selectedItem={{
                bg: 'blue.200',
                borderRadius: 'lg',
              }}
              onValueChange={itemValue => setColorBox(itemValue)}>
              <Select.Item label="Redes Sociais" value='#00f' />
              <Select.Item label='Contas Bancárias' value='#f00' />
              <Select.Item label='Games' value='#f0f' />
              <Select.Item label='Outros' value='#fff' />
            </Select>

          </Box>

          <Button title='Salvar' mt={10} isLoading={isLoading} onPress={handleNewAccount} />
        </VStack>
      </ScrollView>

    </VStack>
  );
}