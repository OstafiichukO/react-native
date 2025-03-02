import { StyleSheet, TextInput, View, ViewProps } from "react-native";
import { colors } from "../styles/global";
import { FC, useState } from "react";

type InputProps = {
  value: string,
  placeholder?: string,
  outerStyles?: ViewProps['style'],
  rightButton?: React.ReactNode,
  onTextChange: (value: string) => void,
  secureTextEntry?: boolean,
  autofocus?: boolean,
  isEmailWrongs?: boolean,
  isPasswordWrongs?: boolean,
  onBlur?: () => void,  
}

const Input: FC<InputProps> = ({
  value,
  onTextChange,
  placeholder,
  outerStyles,
  rightButton,
  autofocus = false,
  secureTextEntry = false,
  isPasswordWrongs,
  isEmailWrongs,
  onBlur,  
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlurHandler = () => {
    setIsFocused(false);
    if (onBlur) onBlur();  
  };

  return (
    <View style={[styles.input, (isEmailWrongs || isPasswordWrongs) && styles.inputError, isFocused && styles.focused, outerStyles]}>
      <TextInput
        value={value}
        autoFocus={autofocus}
        onChangeText={onTextChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.baseText}
        autoCapitalize="none"
        onFocus={onFocus}
        onBlur={onBlurHandler} // Call onBlurHandler on blur
      />

      {rightButton}
    </View>
  )
};

const styles = StyleSheet.create({
  input: {
    padding: 16,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: colors.black_primary,
  },
  focused: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
})

export default Input;