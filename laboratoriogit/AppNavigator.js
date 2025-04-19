import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Prueba1 from './components/Prueba1';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notificaciones">
        <Stack.Screen name="Notificaciones" component={Prueba1} />
        {/* agrega las demás pantallas también: Home, Buscar, etc. */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
