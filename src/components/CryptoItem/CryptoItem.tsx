import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ICrypto } from "../../Interfaces";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "../../navigation/RootNavigator";

export const CryptoItem: React.FC<ICrypto> = ({
  name,
  symbol,
  image,
  market_cap_rank,
  current_price,
  id,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
      <View className="flex-row items-center justify-between border-t border-b border-white py-5 px-3">
        <View className="flex-row items-center gap-x-3">
          <Image source={{ uri: image }} className="w-8 h-8" />
          <View className="flex-col justify-center">
            <Text className="text-white font-bold">{name}</Text>
            <Text className="text-gray-400 uppercase">{symbol}</Text>
          </View>
        </View>
        <View className="flex-col justify-center items-end gap-y-1">
          <Text className="text-white font-bold">
            {current_price}
            <Text>{` \u20AC`}</Text>
          </Text>
          <View className="flex-row justify-center items-center bg-yellow rounded-lg px-2">
            <Text className="text-dark-blue text-xs font-bold">
              {market_cap_rank}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
