import { IPressableProps, Text, VStack, HStack, Pressable, Circle, Box, useTheme, IconButton, Icon } from 'native-base';
import { Password, User, CaretDown, CaretUp, Envelope, Key } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Input } from './Input';


export type dataAccount = {
    id: string
    identifier: string
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
        if (ocultar) {
            setOcultar(false)
        } else {
            setOcultar(true)
        }
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
                    {ocultar ? <Input
                        variant='underlined'
                        value={data.identifier}
                        InputLeftElement={<Icon as={<User color={colors.gray[300]} />} mr={3} />}
                        color='gray.300'
                        size={24}
                        isReadOnly
                    /> :
                        <HStack alignItems='center'>
                            <User color='white' size={20} />
                            <Text color='white' fontSize='md'> {data.identifier}</Text>
                        </HStack>}

                    {ocultar &&
                        <VStack>
                            <Input
                                variant='underlined'
                                value={data.email}
                                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} mr={3} />}
                                color='gray.300'
                                size={24}
                                isReadOnly
                                multiline

                            />
                            <Input
                                variant='underlined'
                                value={data.password}
                                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} mr={3} />}
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