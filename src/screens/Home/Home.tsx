import React from "react";
import { Text, Dimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Button from "../../components/Button";
import { RouteParams } from "../../navigation/RootNavigator";
import AppWrapper from "../../components/AppWrapper";

interface Props {}

export const Home: React.FC<Props> = ({}) => {
  const windowWidth = Dimensions.get("screen").width;

  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const onPress = () => {
    navigation.navigate("Login");
  };

  return (
    <AppWrapper>
      <View className="h-full flex-col justify-center">
        <Text className="uppercase text-4xl text-white text-center">
          Welcome to
        </Text>
        <Text className="uppercase text-3xl text-yellow text-center font-bold">
          Crypto mania
        </Text>
      </View>
      <View
        className="absolute bottom-0 left-0 mb-10 px-10"
        style={{ width: windowWidth }}
      >
        <Button backgroundColorFilled={true} onPress={onPress}>
          Connect
        </Button>
      </View>
    </AppWrapper>
  );
};
