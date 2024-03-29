import React from 'react';
import { VStack } from 'native-base';
import { Header } from '../components/Header';
import { Button } from '../components/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ToastAndroid } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'
import { useEffect, useState, } from 'react';

import { removeSecurity, addSecurity } from '../services/security';
import {getDataAsyncStorage} from '../database/migrations';

export function Config() {

    // const { colors } = useTheme()

    const [isBiometricSupported, setIsBiometricSupported] = useState(false)
    const [enableButton, setEnableButton] = useState(false)
    const [isReady, setIsReady] = useState(false)

    
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

    async function handlMigration()
    {
        setIsReady(true)

        var estaPronto = await getDataAsyncStorage()

        if(!estaPronto){

            setIsReady(estaPronto)
            ToastAndroid.show('Sucesso!',2000)
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
                <Button title='Migrar dados' mt={2} bg='blue.600' isLoading={isReady} onPress={handlMigration}/>
            </VStack>
        </VStack>
    );
}


