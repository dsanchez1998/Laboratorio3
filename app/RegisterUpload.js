import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "../app/Start";
import Login from "../app/Login";
import Register from "../app/Register";
import NewPassword from "../app/NewPassword";
import RecoverPassword from "../app/RecoverPassword";
import RecoverPasswordCode from "../app/RecoverPasswordCode";
import RegisterUpload from "../app/RegisterUpload";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="recoverPassword" component={RecoverPassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterUpload" component={RegisterUpload} />
        <Stack.Screen
          name="RecoverPasswordCode"
          component={RecoverPasswordCode}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
