import { TouchableOpacity, Text } from "react-native";
import { styled } from "nativewind";

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

export default function Button({
  onPress,
  text,
  className = "",
  textClassName = "",
}) {
  return (
    <StyledTouchableOpacity
      className={`bg-[#37C2EB] w-full h-[50px] rounded-lg justify-center items-center shadow-lg ${className}`}
      onPress={onPress}
    >
      <StyledText className={`text-white text-base font-bold ${textClassName}`}>
        {text}
      </StyledText>
    </StyledTouchableOpacity>
  );
}
