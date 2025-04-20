import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { styled } from "nativewind";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Start() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/background1.png")}
      className="flex-1 w-full h-full"
    >
      <StyledView className="flex-1 items-center justify-center px-4">
        <Image
          source={require("../assets/Logo2.png")}
          className="w-[200px] mb-16"
        />
        <StyledText className="text-2xl font-bold text-white mt-5 text-center">
          Todas las cosas que te gustan ver
        </StyledText>
        <StyledText className="text-base text-[#818181] mt-2.5 mb-8 text-center">
          "¡Comparte tus momentos y descubre los comentarios de tus amigos en
          nuestra nueva app de fotos!"
        </StyledText>
        <Button
          text="Siguiente"
          onPress={() => navigation.navigate("Login")}
          className="mt-5"
        />
      </StyledView>
    </ImageBackground>
  );
}
