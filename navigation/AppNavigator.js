import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../app/Login";
import Register from "../app/Register";
import NewPassword from "../app/NewPassword";
import RecoverPassword from "../app/RecoverPassword";
import RecoverPasswordCode from "../app/RecoverPasswordCode";
import RegisterUpload from "../app/RegisterUpload";
import Home from "../app/inicio"
import Buscar from "../app/Buscar"
import Agree from "../app/Agregar"
import Notion from "../app/Notificaciones"
import Perf from "../app/Perfil"
import Chat from "../app/Chats"
import Chat2 from "../app/Chats2"
import Yerika from "../app/Yerika"
import Buscarfo from "../app/Buscarfoto"
import Confi from "../app/Configuracion"
import Confi2 from "../app/Configuracion2"
import Confi3 from "../app/Configuracion3"
import Confi4 from "../app/Configuracion4"
import contac from "../app/Contactenos"
import cambi from "../app/Cambiarcontraseña"
import olvi from "../app/Olvidarcontraseña"
import olvido from "../app/Olvidocontraseña2"
import contraseñan from "../app/Nuevacontraseña"
import Perfil2 from "../app/Perfil2"
import Fotocomen from "../app/fotocomentarios"
import Buscarfoto from "../app/Buscarfoto"



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="recoverPassword" component={RecoverPassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterUpload" component={RegisterUpload} />
        <Stack.Screen name="Inicio" component={Home} />
        <Stack.Screen name="Buscar" component={Buscar} />
        <Stack.Screen name="Agregar" component={Agree} />
        <Stack.Screen name="Notificaciones" component={Notion} />
        <Stack.Screen name="Perfil" component={Perf} />
        <Stack.Screen name="Chats" component={Chat} />
        <Stack.Screen name="Chats2" component={Chat2} />
        <Stack.Screen name="Yerika" component={Yerika} />
        <Stack.Screen name="buscarfoto" component={Buscarfo} />
        <Stack.Screen name="Configuracion" component={Confi} />
        <Stack.Screen name="Configuracion2" component={Confi2} />
        <Stack.Screen name="Configuracion3" component={Confi3} />
        <Stack.Screen name="Configuracion4" component={Confi4} />
        <Stack.Screen name="Contactenos" component={contac} />
        <Stack.Screen name="Cambiarcontraseña" component={cambi} />
        <Stack.Screen name="Olvidarcontraseña" component={olvi} />
        <Stack.Screen name="Olvidocontraseña2" component={olvido} />
        <Stack.Screen name="Nuevacontraseña" component={contraseñan} />
        <Stack.Screen name="Perfil2" component={Perfil2} />
        <Stack.Screen name="Fotocomentarios" component={Fotocomen} />
        <Stack.Screen name="Buscarfoto" component={Buscarfoto} />
       
        <Stack.Screen
          name="RecoverPasswordCode"
          component={RecoverPasswordCode}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
