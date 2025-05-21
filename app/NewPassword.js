import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Alert as RNAlert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useSuccessAlert } from "../components/SuccessAlert";
import Button from "../components/Button";
import Input from "../components/Input";
import { styled } from "nativewind";
import { URL_API } from "@env";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function NewPassword() {
  const { show, Alert } = useSuccessAlert();
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params; // Get email from previous screen
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = async () => {
    if (password.trim() === "") {
      alert("Error \n La contraseña es requerida");
      return;
    }

    if (confirmPassword.trim() === "") {
      alert("Error \n La contraseña es requerida");
      return;
    }

    if (password !== confirmPassword) {
      alert("Error \n Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${URL_API}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword: password }), // Send email and new password
      });

      const result = await response.json();

      if (response.ok && result.success) {
        show({
          title: "¡Tu nueva contraseña, fue guardada con éxito!",
          route: "Login",
        });
      } else {
        RNAlert.alert(
          "Error",
          result.message || "No se pudo actualizar la contraseña."
        );
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      RNAlert.alert(
        "Error",
        "No se pudo conectar al servidor. Por favor, intente más tarde."
      );
    } finally {
      setIsLoading(false);
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
        <StyledText className="text-2xl font-bold text-white text-start mb-2">
          Ingresa tu nueva contraseña
        </StyledText>

        <StyledText className="text-base text-gray-400 text-start mb-8">
          Último paso
        </StyledText>

        <Input
          placeholder="Ingrese su contraseña nueva"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          placeholder="Repite la contraseña nueva"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Button
          text="Nueva contraseña"
          onPress={validatePassword}
          disabled={isLoading}
        />
      </StyledView>
      <Alert />
    </ImageBackground>
  );
}
