import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView className="bg-dark-blue">
      <View className="h-full bg-dark-blue px-10">{children}</View>
    </SafeAreaView>
  );
};
