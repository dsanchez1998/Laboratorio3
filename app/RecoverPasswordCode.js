import React, { useState } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import Input from "../components/Input";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function RecoverPasswordCode() {
  const navigation = useNavigation();
  const [code, setCode] = useState("");

  const validateCode = () => {
    if (code.trim() === "") {
      alert("Error \n El Codigo es requerido");
      return;
    }
    navigation.navigate("NewPassword");
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
        <StyledText className="text-2xl font-bold text-white text-start mb-2">
        ¡Revisa tu correo electrónico e introduce el código para continuar!
        </StyledText>

        <StyledText className="text-base text-gray-400 text-start mb-8">
          Penúltimo paso
        </StyledText>

        <Input
          placeholder="Introduce el código recibido"
          value={code}
          onChangeText={setCode}
          keyboardType="Code-address"
        />

        <Button text="Siguiente" onPress={validateCode} />
      </StyledView>
    </ImageBackground>
  );
}
