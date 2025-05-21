import React, { useState } from "react";
import { View, Text, ImageBackground, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import Input from "../components/Input";
import { styled } from "nativewind";
import { URL_API } from "@env"; // Make sure URL_API is configured in your .env file

const StyledView = styled(View);
const StyledText = styled(Text);

export default function RecoverPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const validateEmail = async () => {
    if (email.trim() === "") {
      Alert.alert("Error", "El correo electrónico es requerido");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor, ingrese un correo electrónico válido.");
      return;
    }

    try {
      const response = await fetch(`${URL_API}/validate-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.exists) {
        /*si el correo esta registrado*/
        navigation.navigate("RecoverPasswordCode", { email: email });
      } else {
        Alert.alert(
          "Error",
          result.message || "El correo electrónico no se encuentra registrado."
        );
      }
    } catch (error) {
      console.error("Error validating email:", error);
      Alert.alert(
        "Error",
        "No se pudo conectar al servidor. Por favor, intente más tarde."
      );
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
          ¿Olvidó su contraseña?
        </StyledText>
        <StyledText className="text-base text-gray-400 mb-8">
          ¡No te preocupes, ya lo solucionamos!
        </StyledText>
        <Input
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Button text="Siguiente" onPress={validateEmail} />
      </StyledView>
    </ImageBackground>
  );
}
