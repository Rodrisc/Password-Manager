import React from 'react';
import { VStack, useTheme } from 'native-base';
import { Header } from '../components/Header';
import { Button } from '../components/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ToastAndroid } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'
import { useEffect, useState, } from 'react';

export function Config() {

    const { colors } = useTheme()

    const [isBiometricSupported, setIsBiometricSupported] = useState(false)
    const [enableButton, setEnableButton] = useState(false)

    const addSecurity = async (response: boolean) => {

        if (response) {
            const data = [{ security: response }]

            try {
                await AsyncStorage.setItem("@PasswordManager:Security", JSON.stringify(data))
                ToastAndroid.show('Segurança adicionada com sucesso!', 2000)

            } catch (e) {
                console.log(e)
            }
            }
        }

    const removeSecurity = async (response: boolean) => {

        if (response) {
            await AsyncStorage.removeItem("@PasswordManager:Security")
            ToastAndroid.show('Segurança removida com sucesso!', 2000)
        } else{
            ToastAndroid.show('Não foi possível remover a segurança', 2000)
        }
    }

    const confirmSegurityForAdd = async () => {
        await LocalAuthentication.authenticateAsync({
            promptMessage: 'Autenticação',
            fallbackLabel: 'Entre com a senha',

        }).then(result => {
            if(!result.success){
                return ToastAndroid.show('Não foi possível habilitar a segurança, verifique as credênciais do dispositivo.', 2000)
            }
            addSecurity(result.success)
            verifyAsyncStorage()

        }).catch(Error => console.log(Error))
    }

    const confirmSegurityForRemove = async () => {

        await LocalAuthentication.authenticateAsync({
            promptMessage: 'Autenticação',
            fallbackLabel: 'Entre com a senha',


        }).then(result => {
            removeSecurity(result.success)
            verifyAsyncStorage()

        }).catch(Error => console.log(Error))
    }   

    function handleAddSecurity() {
        if (!isBiometricSupported) {
            return ToastAndroid.show('Seu dispositivo não é compatível', 2000)
        }
        return Alert.alert('Adicionar segurança', 'Deseja adicionar a segurança?',
            [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Sim',
                    onPress: () => confirmSegurityForAdd()
                }
            ]
        )
    }

    function handleRemoveSecurity () {
        return Alert.alert('Remover', 'Deseja realmente remover a segurança?',
            [
                {
                    text: 'cancelar',
                },
                {
                    text: 'Sim',
                    onPress: () => confirmSegurityForRemove()
                }
            ]
        )
    }


    const verifyCompatibility = async () => {
        try {
            const compatible = await LocalAuthentication.hasHardwareAsync()
            setIsBiometricSupported(compatible)
        } catch (e) {
            console.log(e)
        }
    }

    const verifyAsyncStorage = async () => {
        try{
            const responde = await AsyncStorage.getItem("@PasswordManager:Security")
            if(!responde){
                setEnableButton(false)
            } else{
                setEnableButton(true)
            }
        } catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        verifyAsyncStorage()
        verifyCompatibility()
    }, [enableButton])

    

    return (
        <VStack bg="gray.700" flex={1} pb={6}>
            <Header title='Configurações' pr={6}/>
            <VStack m={2} flex={1} justifyContent='center'>
                <Button title='Adicionar segurança' mb={2} onPress={handleAddSecurity} isDisabled={enableButton} />
                <Button title='Remover segurança' bg='red.500' _pressed={{ bg: 'red.800' }} onPress={handleRemoveSecurity} isDisabled={!enableButton} />
            </VStack>
        </VStack>
    );
}


