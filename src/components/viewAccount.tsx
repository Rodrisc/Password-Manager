import { IPressableProps, Text, VStack, HStack, Pressable, Circle, Box, useTheme, IconButton, Icon } from 'native-base';
import { User, CaretDown, CaretUp, Envelope, Key, IdentificationCard, IdentificationBadge, ClipboardText } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, TouchableOpacity, Clipboard, ToastAndroid } from 'react-native';

import { Input } from './Input';

export type dataAccount = {
    id: string
    identifier: string
    user: string
    email: string
    password: string
    colorBox: string
}

type Props = IPressableProps & {
    data: dataAccount
}


export function ViewAccount({ data, ...rest }: Props) {

    const { colors } = useTheme()

    const [ocultar, setOcultar] = useState(false)

    function handleOcultar() {
        setOcultar(!ocultar)
    }

    const copy = (args: string) => {
        console.log('deuc erto', args)
        Clipboard.setString(args)
        ToastAndroid.show('Copiado com sucesso!', 2000)
    }

    return (

        <HStack
            bg='gray.600'
            mb={4}
            alignItems='center'
            justifyContent='space-between'
            rounded='sm'
            overflow='hidden'>

            <Box h='full' w={2} bg={data.colorBox} />

            <Pressable flex={1} my={5} ml={5} {...rest}>

                <VStack>
                    {/* verificar essa condição */}
                    {ocultar ? <Input
                        variant='underlined'
                        value={data.identifier}
                        InputLeftElement={<Icon as={<IdentificationBadge color={colors.gray[300]} />} mr={3} />}
                        color='gray.300'
                        size={24}
                        isReadOnly
                    /> :
                        <HStack alignItems='center'>
                            <IdentificationCard color='white' />
                            <Text color='white' fontSize='md' ml={3}>{data.identifier}</Text>
                        </HStack>}

                    {ocultar &&
                        <VStack>

                            {!!data.user && <Input
                                variant='underlined'
                                value={data.user}
                                InputLeftElement={<Icon as={<User color={colors.gray[300]} />} mr={3} />}
                                InputRightElement={<TouchableOpacity onPress={() => copy(data.user)} style={{ marginRight: 15 }}>
                                {<ClipboardText color={colors.gray[300]} /> }
                              </TouchableOpacity>}
                                color='gray.300'
                                size={24}
                                isReadOnly
                                multiline
                            />}

                            {!!data.email && <Input
                                variant='underlined'
                                value={data.email}
                                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} mr={3} />}
                                InputRightElement={<TouchableOpacity onPress={() => copy(data.email)} style={{ marginRight: 15 }}>
                                {<ClipboardText color={colors.gray[300]} /> }
                              </TouchableOpacity>}
                                color='gray.300'
                                size={24}
                                isReadOnly
                                multiline

                            />}
                            <Input
                                variant='underlined'
                                value={data.password}
                                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} mr={3} />}
                                InputRightElement={<TouchableOpacity onPress={() => copy(data.password)} style={{ marginRight: 15 }}>
                                {<ClipboardText color={colors.gray[300]} /> }
                              </TouchableOpacity>}
                                color='gray.300'
                                size={24}
                                isReadOnly

                            />
                        </VStack>

                    }

                </VStack>
            </Pressable>
            <Circle bg='gray.500' h={10} w={10} mr={5} ml={2}>
                <IconButton icon={ocultar ? <CaretUp size={20} color='white' /> : <CaretDown size={20} color='white' />}
                    focusable={false}
                    onPress={handleOcultar}
                />
            </Circle>

        </HStack>

    )
}