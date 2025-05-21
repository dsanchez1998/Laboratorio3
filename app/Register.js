import React, { useState } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import Input from "../components/Input";
import { styled } from "nativewind";
import Checkbox from "expo-checkbox";
import { URL_API } from "@env";
const StyledView = styled(View);
const StyledText = styled(Text);

export default function Register() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [apellido, setApellido] = useState("");

  const handleRegister = () => {
    console.log("Registrando...");

    fetch(`${URL_API}/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, nombre, telefono, apellido }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "200") {
          console.log(data);
          alert("Registro exitoso");
          navigation.navigate("RegisterUpload", { email });
        } else {
          alert("error: " + data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Error al registrar: " + error);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/background1.png")}
      className="flex-1 w-full h-full"
    >
      <StyledView className="flex-1 p-4 items-center justify-center">
        <Image
          source={require("../assets/Logo2.png")}
          className="w-full mb-4"
        />
        <StyledText className="text-2xl font-bold text-white text-start mb-2">
          Cree su cuenta de usuario
        </StyledText>
        <StyledText className="text-base text-gray-400 text-start mb-8">
          Disfruta y explora nuevas posibilidades
        </StyledText>
        <Input
          placeholder="Ingrese su nombre"
          value={nombre}
          onChangeText={setNombre}
          keyboardType="text"
        />
        <Input
          placeholder="Ingrese su apellido"
          value={apellido}
          onChangeText={setApellido}
          keyboardType="text"
        />
        <Input
          placeholder="Ingrese su correo electronico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          placeholder="Ingrese su número de teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />
        <Input
          placeholder="Ingrese su contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          placeholder="Repite la contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Button text="Crear usuario" onPress={handleRegister} />

        <StyledView className="flex-row w-full mt-5">
          <StyledView className="mx-1">
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#37C2EB" : undefined}
            />
          </StyledView>
          <StyledText className="text-gray-400 text-sm">
            Acepto la Política de privacidad y los Términos de servicio.
          </StyledText>
        </StyledView>
      </StyledView>
    </ImageBackground>
  );
}
