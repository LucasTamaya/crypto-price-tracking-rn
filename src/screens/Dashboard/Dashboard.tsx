import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ICrypto } from "../../Interfaces";
import useFetch from "../../Hooks/useFetch";
import CryptoItem from "../../components/CryptoItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "../../navigation/RootNavigator";

export const Dashboard: React.FC = () => {
  const { error, isPending, data } = useFetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur"
  );

  return (
    <SafeAreaView className="bg-dark-blue">
      <ScrollView className="bg-dark-blue">
        <Text className="text-white text-center text-xl font-bold my-7">
          Crypto <Text className="text-yellow">Mania</Text>{" "}
        </Text>

        {isPending && <Text>Loading ...</Text>}
        {error && <Text>{error}</Text>}
        {data &&
          data.map((crypto: ICrypto) => (
            <CryptoItem
              key={crypto.id}
              id={crypto.id}
              name={crypto.name}
              symbol={crypto.symbol}
              image={crypto.image}
              market_cap_rank={crypto.market_cap_rank}
              current_price={crypto.current_price}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};
