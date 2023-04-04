import { AsyncStorage, ToastAndroid } from "react-native"

// Adição e/ou remoção respectivamente da segurança do app com AsyncStorage

export const addSecurity = async (response: boolean) => {

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

export const removeSecurity = async (response: boolean) => {

    if (response) {
        await AsyncStorage.removeItem("@PasswordManager:Security")
        ToastAndroid.show('Segurança removida com sucesso!', 2000)
    } else {
        ToastAndroid.show('Não foi possível remover a segurança', 2000)
    }
}
