import React from 'react';
import { VStack, Text, useTheme, Heading } from 'native-base';
import { Button } from '../components/Button';
import Logo from '../assets/logosvg.svg'

type Props = {
    authenticate: any
}

export function Login({ authenticate }: Props) {

    const { colors } = useTheme()

    return (
        <VStack flex={1} alignItems='center' justifyContent='center'>

            <Logo />

            <Heading p={30}>
                Password Manager
            </Heading>
            

            <Text textAlign='center' p={2} fontSize='lg' pb={10}>
                Para ter acesso ao Password Manager, entre com as credências do seu dispositivo.
            </Text>

            <Button title='Acessar' onPress={authenticate} w={20} />

        </VStack>
    );
}