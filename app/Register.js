import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
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
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [apellido, setApellido] = useState("");
  const [quotes, setQuotes] = useState("");

  const handleRegister = async () => {
    if (
      !email ||
      !password ||
      !nombre ||
      !telefono ||
      !apellido ||
      !confirmPassword ||
      !pregunta ||
      !respuesta
    ) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    const telefonoRegex = /^[0-9]+$/;
    if (!telefonoRegex.test(telefono)) {
      alert("Por favor, ingrese un número de teléfono válido (solo números).");
      return;
    }

    if (telefono.length > 11 || telefono.length < 8) {
      alert(
        "Por favor, ingrese un número de teléfono válido (entre 8 y 11 dígitos)."
      );
      return;
    }

    console.log("Registrando...");

    try {
      // Primero, validar si el correo ya existe
      const validateEmailResponse = await fetch(`${URL_API}/validate-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const validateEmailData = await validateEmailResponse.json();

      if (validateEmailResponse.ok && validateEmailData.exists) {
        alert("Error: El correo electrónico ya se encuentra registrado.");
        return;
      } else if (
        !validateEmailResponse.ok &&
        validateEmailData.exists === false
      ) {
        // Si el correo no existe (puede ser un 404 que es ok en este contexto de validación)
        // Proceder con el registro
        const registerResponse = await fetch(`${URL_API}/registrar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            nombre,
            telefono,
            apellido,
            quotes,
            pregunta, // Asegúrate de enviar pregunta y respuesta
            respuesta,
          }),
        });

        const registerData = await registerResponse.json();

        if (registerData.status == "200") {
          const userId = registerData.data.id;
          alert("Registro exitoso");
          navigation.navigate("RegisterUpload", { email, userId });
        } else {
          console.log(registerData.message);
          alert("Error al registrar: " + registerData.message);
        }
      } else if (!validateEmailResponse.ok) {
        // Otro tipo de error al validar el email
        alert(
          "Error al validar el correo electrónico: " +
            (validateEmailData.message || "Error desconocido")
        );
      }
    } catch (error) {
      console.log(error);
      alert("Error en la conexión: " + error);
    }
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#000",
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ImageBackground
        source={require("../assets/background1.png")}
        className="flex-1 w-full h-full"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StyledView className="flex-1 p-4 items-center pt-16">
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
              placeholder="Descripción del perfil"
              value={quotes}
              onChangeText={setQuotes}
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
              placeholder="Pregunta de Seguridad"
              value={pregunta}
              onChangeText={setPregunta}
            />
            <Input
              placeholder="Digite su Respuesta de Seguridad"
              value={respuesta}
              onChangeText={setRespuesta}
              secureTextEntry
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
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
