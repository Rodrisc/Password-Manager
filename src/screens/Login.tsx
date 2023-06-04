import React from 'react';
import { ImageBackground, Image, StyleSheet } from 'react-native'
import { VStack, Text, useTheme, Heading } from 'native-base';
import { Button } from '../components/Button';
import Logo from '../assets/logosvg.svg'

type Props = {
    authenticate: () => void
}

export function Login({ authenticate }: Props) {

    // const { colors } = useTheme()

    return (
        <ImageBackground source={require('../assets/imageBackground.jpg')} style={styles.ImageBackground}>
            <VStack flex={1} alignItems='center' justifyContent='center'>



                <Logo />

                <Heading p={30}>
                    Password Manager
                </Heading>


                <Text textAlign='center' p={2} fontSize='lg' pb={10}>
                    Para ter acesso ao Password Manager, entre com as credênciais do seu dispositivo.
                </Text>

                <Button title='Acessar' onPress={authenticate} w={20} borderRadius={30} />

            </VStack>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    ImageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
    }
})