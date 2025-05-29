import React from "react";
import { TextInput } from "react-native";
import { styled } from "nativewind";

const StyledTextInput = styled(TextInput);

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  className = "",
  ...props
}) {
  return (
    <StyledTextInput
      className={`bg-transparent text-white border w-full border-gray-300 rounded-lg p-4 mb-4 text-base ${className}`}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      {...props}
    />
  );

}
