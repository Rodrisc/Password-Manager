import AsyncStorage from "@react-native-async-storage/async-storage";
import PasswordServices from "../services/password.services";
import { ToastAndroid } from "react-native";

const pServices = new PasswordServices()

export async function getDataAsyncStorage() {
    
    var data = []



    try {
        const jsonvalue = await AsyncStorage.getItem('@PasswordManager:Passwords')
        console.log(JSON.parse(jsonvalue))
        jsonvalue ? data = JSON.parse(jsonvalue) : []

        data.forEach(element => {
            pServices.insertPassowrd(element) 
        });

        return false

    } catch (e) {
        console.log (e)
    }

    



    
}

// async function addinSqLite(dados){

//     try{
//         dados.forEach(async element => {
//             await pServices.insertPassowrd(element)
//         })

//         console.log(true)
//     }catch (e) {
//         console.log(e)
//         console.log(false)
//     }

// }

