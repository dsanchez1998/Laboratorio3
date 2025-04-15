import React, { useState } from "react";
import { View, Text, Image, Modal } from "react-native";
import Button from "./Button";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);

const SuccessAlertComponent = ({ visible, title, route, onClose }) => {
  const navigation = useNavigation();

  const handleContinue = () => {
    if (route) {
      navigation.navigate(route);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <StyledView className="flex-1 items-center justify-center bg-black/50">
        <StyledView className="bg-gray-500 rounded-xl w-4/5 h-4/5">
          {/* Header */}
          <StyledView className="mt-4 p-4">
            <StyledText className="text-white text-2xl font-bold text-center">
              {title}
            </StyledText>
          </StyledView>

          {/* Contenido */}
          <StyledView className="flex-1 items-center justify-center">
            <Image
              source={require("../assets/check.png")}
              className="w-32 h-32"
            />
          </StyledView>

          {/* Footer */}
          <StyledView className="mb-4 p-4">
            <Button
              text="Continuar"
              onPress={handleContinue}
              className="w-full"
            />
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

let showAlert = null;

export const useSuccessAlert = () => {
  const [visible, setVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({});

  const show = (props) => {
    setAlertProps(props);
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const Alert = () => (
    <SuccessAlertComponent visible={visible} onClose={hide} {...alertProps} />
  );

  return { show, Alert };
};

export default useSuccessAlert;
