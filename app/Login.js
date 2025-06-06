import React, { useState } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import Input from "../components/Input";
import { styled } from "nativewind";
import Checkbox from "expo-checkbox";
import { URL_API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${URL_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const answer = await response.json();
      if (answer.status == "200") {
        // Guarda el token JWT en AsyncStorage
        await AsyncStorage.setItem("token", answer.token);
        await AsyncStorage.setItem("userId", answer.data.id.toString());
        await AsyncStorage.setItem(
          "foto_perfil",
          answer.data.foto_perfil.toString()
        );

        await AsyncStorage.setItem(
          "nombreCompleto",
          answer.data.nombre + " " + answer.data.apellido
        );

        await AsyncStorage.setItem("descripcion", answer.data.quotes);

        alert("Bienvenido " + answer.data.nombre);
        navigation.navigate("Inicio");
      } else {
        alert("error: " + answer.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión: " + error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background1.png")}
      className="flex-1 w-full h-full"
    >
      <StyledView className="flex-1 p-4 items-center justify-center">
        <Image
          source={require("../assets/Logo2.png")}
          className="w-[200px] mb-16"
        />

        <StyledText className="text-2xl font-bold text-white text-center mb-2">
          Inicia sesión con tu cuenta
        </StyledText>
        <StyledText className="text-base text-gray-400 mb-8">
          ¡Únete a nosotras y explora nuevas posibilidades!
        </StyledText>
        <Input
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          placeholder="Ingrese tu contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <StyledView className="flex-row w-full items-end justify-end">
          <StyledText
            onPress={() => navigation.navigate("recoverPassword")}
            className="text-[#37C2EB] mb-8"
          >
            ¿Has olvidado tu contraseña?
          </StyledText>
        </StyledView>

        <Button text="Iniciar sesión" onPress={handleLogin} />
        <StyledText className="text-base text-gray-400 mt-8 mb-2">
          ¿Aún No tienes una cuenta?
        </StyledText>
        <StyledText
          onPress={() => navigation.navigate("Register")}
          className="text-[#37C2EB] mb-8"
        >
          Regístrate aquí
        </StyledText>
      </StyledView>
    </ImageBackground>
  );
}
