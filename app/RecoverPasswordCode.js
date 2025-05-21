import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Alert as RNAlert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../components/Button";
import Input from "../components/Input";
import { styled } from "nativewind";
import { URL_API } from "@env";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function RecoverPasswordCode() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params; // Recibimos el email de la pantalla anterior

  const [answer, setAnswer] = useState("");
  const [preguntaSeguridad, setpreguntaSeguridad] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPreguntaSeguridad = async () => {
      if (!email) {
        setError("No se proporcionó un correo electrónico.");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${URL_API}/get-security-question`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const result = await response.json();
        if (response.ok && result.question) {
          setpreguntaSeguridad(result.question);
        } else {
          setError(
            result.message || "No se pudo obtener la pregunta de seguridad."
          );
          setpreguntaSeguridad("");
        }
      } catch (err) {
        setError("Error de conexión al obtener la pregunta de seguridad.");
        console.error("Fetch security question error:", err);
        setpreguntaSeguridad("");
      } finally {
        setIsLoading(false);
      }
    };

    getPreguntaSeguridad();
  }, [email]);

  const validarRespuesta = async () => {
    if (answer.trim() === "") {
      RNAlert.alert("Error", "La respuesta es requerida");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${URL_API}/validate-security-answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, answer }),
      });
      const result = await response.json();

      if (response.ok && result.valid) {
        navigation.navigate("NewPassword", { email: email }); // Pasamos el email a la siguiente pantalla
      } else {
        RNAlert.alert("Error", result.message || "La respuesta es incorrecta.");
      }
    } catch (err) {
      console.error("Validate answer error:", err);
      RNAlert.alert(
        "Error",
        "No se pudo validar la respuesta. Intente más tarde."
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
          className="w-[200px] mb-10"
        />

        {isLoading && !preguntaSeguridad && !error && (
          <ActivityIndicator size="large" color="#ffffff" />
        )}

        {error && (
          <StyledText className="text-red-500 text-center mb-4 px-4">
            {error}
          </StyledText>
        )}

        {!isLoading && preguntaSeguridad && !error && (
          <>
            <StyledText className="text-xl font-semibold text-white text-center mb-2">
              Pregunta de Seguridad:
            </StyledText>
            <StyledText className="text-lg text-gray-300 text-center mb-6 px-4">
              {preguntaSeguridad}
            </StyledText>
            <Input
              placeholder="Digite su respuesta de Seguridad"
              value={answer}
              onChangeText={setAnswer}
              keyboardType="default"
            />
            <Button
              text="Siguiente"
              onPress={validarRespuesta}
              disabled={isLoading}
            />
          </>
        )}

        {!isLoading && !preguntaSeguridad && !error && (
          <StyledText className="text-white text-center mb-4 px-4">
            No se pudo cargar la pregunta de seguridad. Verifique el correo o
            intente más tarde.
          </StyledText>
        )}
        {isLoading && (preguntaSeguridad || error) && (
          <ActivityIndicator size="small" color="#ffffff" className="mt-4" />
        )}
      </StyledView>
    </ImageBackground>
  );
}
