"use client";

import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert as RNAlert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSuccessAlert } from "../components/SuccessAlert";
import Button from "../components/Button";
import { styled } from "nativewind";
import { URL_API } from "@env";

import { useRoute } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function RegisterUpload() {
  const { show, Alert } = useSuccessAlert();
  const [image, setImage] = useState(null);
  const route = useRoute();
  const { email } = route.params;
  const { userId } = route.params;

  const pickImage = async () => {
    // Solicitar permisos para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      RNAlert.alert(
        "Permiso denegado",
        "Necesitamos permisos para acceder a tu galería"
      );
      return;
    }

    // Abrir el selector de imágenes
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateUpload = () => {
    if (!image) {
      RNAlert.alert(
        "Error",
        "Por favor, sube una foto de perfil antes de continuar"
      );
      return;
    }

    const formData = new FormData();

    // Usar el email como parte del nombre del archivo
    const fileExtension = image.split(".").pop();
    const emailUser = email.split("@")[0];
    const fileName = `${emailUser}.${fileExtension}`;

    formData.append("nombreImg", fileName);
    formData.append("userId", userId);
    formData.append("image", {
      uri: image,
      type: `image/${fileExtension}`,
      name: fileName,
    });

    fetch(`${URL_API}/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          show({
            title: "¡Tus datos, fueron guardados con éxito!",
            route: "Login",
          });
        } else {
          RNAlert.alert("Error", data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Error al subir la imagen: " + error);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/background1.png")}
      className="flex-1 w-full h-full"
    >
      <StyledView className="flex-1 p-4 items-center justify-center">
        <StyledText className="text-2xl font-bold text-white text-start mb-2">
          Últimos retoques a tu registro
        </StyledText>

        <StyledText className="text-xl text-gray-400 text-start mb-8">
          Ya casi terminamos
        </StyledText>

        <StyledText className="text-2xl font-bold text-white text-center mb-8">
          Por favor, coloca tu foto de perfil
        </StyledText>

        {/* Componente circular para la foto de perfil */}
        <TouchableOpacity
          onPress={pickImage}
          className="w-32 h-32 rounded-full bg-[#4A5074] items-center justify-center overflow-hidden mb-8"
        >
          {image ? (
            <Image source={{ uri: image }} className="w-full h-full" />
          ) : (
            <StyledView className="items-center justify-center">
              <StyledText className="text-white text-lg">Foto</StyledText>
            </StyledView>
          )}
        </TouchableOpacity>

        <Button text="Guardar Cambios" onPress={validateUpload} />
      </StyledView>
      <Alert />
    </ImageBackground>
  );
}
