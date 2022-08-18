import { VStack } from 'native-base';
import { NavigationContainer } from '@react-navigation/native'
import { Home } from '../screens/Home';
import { AppRoutes } from './app.routes';

export function Routes() {
  return (
    <NavigationContainer>
        <AppRoutes />
    </NavigationContainer>
  );
}