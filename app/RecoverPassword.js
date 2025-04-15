import React, { useState } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import Input from "../components/Input";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function RecoverPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const validateEmail = () => {
    if (email.trim() === "") {
      alert("Error \n El correo electrónico es requerido");
      return;
    }
    alert("Correo electrónico enviado");
    navigation.navigate("RecoverPasswordCode");
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
          Olvidó su contraseña?
        </StyledText>
        <StyledText className="text-base text-gray-400 mb-8">
          No te preocupes, ya lo vamos a solucionar!
        </StyledText>
        <Input
          placeholder="Ingresa tu correo"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Button text="Siguiente" onPress={validateEmail} />
      </StyledView>
    </ImageBackground>
  );
}
