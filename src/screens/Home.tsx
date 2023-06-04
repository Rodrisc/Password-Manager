import { VStack, Text, HStack, IconButton, useTheme, Heading, Center, FlatList} from 'native-base';
import { useState, useCallback } from 'react';
import { LockKey, Tray, Gear } from 'phosphor-react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PasswordServices from '../services/password.services';


import { Button } from '../components/Button';

import { accountData } from '../@types/dataTypes';

import { ShowData } from '../components/ShowData';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../components/Loading';
import { Input } from '../components/Input';
import { Alert, ToastAndroid } from 'react-native';


var jsonvalue: any

export function Home() {

  const pServices = new PasswordServices()

  const navigation = useNavigation()

  const [accounts, setAccounts] = useState<accountData[]>([])
  // const [filter, setFilter] = useState('')

  const [inputSearch, setInputSearch] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const { colors } = useTheme()


  function handleOpenRegister() {

    navigation.navigate('register')
  }

  function handleOpenConfig() {
    navigation.navigate('config')
  }

  function handleOpenEdit(id: string) {
    // let bo = true
    navigation.navigate('edit', { id })
  }

  const getData = async () => {
    setIsLoading(true)
    try {
      jsonvalue = await pServices.getAllPassword()
      
      jsonvalue ? setAccounts(jsonvalue) : []
    } catch (error) {
      console.log('Erro na consulta: ', error)
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  // async function handleGetPasswordInOrder(order: string) {
  //   setIsLoading(true)
  //   console.log(order)
  //   try {
  //     jsonvalue = await pServices.getPasswordByFilterAndSearch(inputSearch)
  //     jsonvalue ? setAccounts(jsonvalue) : []
  //   } catch (error) {
  //     console.log('Erro na consulta: ', error)

  //   }
  //   setFilter(order)
  //   setIsLoading(false)
  // }

  async function handleSearhPassowrd(search: string) {
    setInputSearch(search)
    try {
      jsonvalue = await pServices.getSearchPassword(search)
      jsonvalue ? setAccounts(jsonvalue) : []
    } catch (error) {
      console.log('Erro na consulta: ', error)
    }
  }

  function handleInfoTotalPassword(){
    ToastAndroid.show(`${accounts.length ? `Você tem ${accounts.length} senha(s) salva(s)`: `Você não tem senhas salvas`}`, 2000)
  }


  useFocusEffect(useCallback(() => {
    getData()
    setInputSearch('')
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
          {/* <LockKey color={colors.gray[300]} /> */}
          <Heading color='gray.300'>
            Password Manager
          </Heading>
        </HStack>

        <IconButton
          icon={<Gear size={26} color={colors.gray[300]} />}
          onPress={handleOpenConfig}
        />
      </HStack>

      {isLoading ? <Loading /> :

        <VStack flex={1} px={6} >

          <HStack w='full' mt={5} mb={4} justifyContent='space-between' alignItems='center'>
            {/* <Heading color='gray.300'>
              Minhas senhas
            </Heading>
            <Text color='gray.200'>{accounts.length}</Text> */}

            {/* <Box >
              <Select selectedValue={filter} minWidth='49%' accessibilityLabel='Choose Filter'
                placeholder='Filtrar' _selectedItem={{
                  bg: "amber.400",
                  endIcon: <CaretDown size='5' />
                }} onValueChange={itemValue => handleGetPasswordInOrder(itemValue)}
                borderRadius='none'
                color='gray.300'
                fontSize='md'
                borderWidth='0'
                borderBottomWidth={1}
                
                
                >

          
                <Select.Item label='Filtrar por Identificador' value='identifier' />
                
                
              </Select>
            </Box> */}

            <Input placeholder='Pesquisar' color='gray.300' maxW='100%'  pl={3} value={inputSearch} onChangeText={handleSearhPassowrd}
            InputRightElement={<Button bg='none' title={accounts.length} h={9} _pressed={{ bg:'none'}} onPress={handleInfoTotalPassword}></Button>}></Input>
            
            {/* <Text color='gray.200' bg='amber.300' w={4} borderRadius='full'>{accounts.length}</Text> */}
          </HStack>

          <FlatList
            data={accounts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ShowData data={item} onPress={() => handleOpenEdit(item.id)} />}
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
          <Button title='Adicionar nova senha' onPress={handleOpenRegister}
            mt={3}
          />
        </VStack>}

    </VStack>
  );
}