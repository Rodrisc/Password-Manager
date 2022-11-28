import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { Register } from '../screens/Register'
import { Edit } from '../screens/Edit'
import { Config } from '../screens/Config'


const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='home' component={Home} />
            <Screen name='register' component={Register} />
            <Screen name='edit' component={Edit} />
            <Screen name='config' component={Config} />
        </Navigator>
    )


}