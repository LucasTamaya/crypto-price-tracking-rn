import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  children: string;
  backgroundColorFilled: boolean; // if we want the background color to be filled or not
  onPress: () => void;
}

export const Button: React.FC<Props> = ({
  children,
  backgroundColorFilled,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        className={`w-full bg-yellow uppercase text-center text-dark-blue font-bold py-4 px-10 rounded-md
         ${
           backgroundColorFilled === false &&
           "bg-transparent border-2 border-yellow text-yellow"
         }`}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
