import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  EmitterSubscription,
} from "react-native";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { AnimatePresence, MotiView } from "moti";

import AppWrapper from "../../components/AppWrapper";
import { loginValidationSchema } from "../../utils/validationSchemas";
import Button from "../../components/Button";
import { RouteParams } from "../../navigation/RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../../utils/firebase-config";
import { setUserId } from "../../utils/asyncStorage";

interface FormValues {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const windowWidth = Dimensions.get("screen").width;

  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  // all necessary tools to manage my form
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(loginValidationSchema),
  });

  // detect when the keyboard disappear
  useEffect(() => {
    const keyboardDidHideListener: EmitterSubscription = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [isKeyboardVisible]);

  const onSubmit = handleSubmit(async (data) => {
    Keyboard.dismiss();

    try {
      const newUser: UserCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const userId: string = await newUser.user.uid;

      await setUserId(userId);

      navigation.navigate("Dashboard");
    } catch (error: unknown) {
      console.log(error);
    }
  });

  return (
    <AppWrapper>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="w-full h-full">
          <KeyboardAvoidingView>
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View className="my-10">
                  <Text className="text-yellow font-bold mb-2">Your email</Text>
                  <TextInput
                    value={value || ""}
                    className="bg-white rounded-md p-3 mb-1"
                    onChangeText={onChange}
                    keyboardType="email-address"
                    onTouchStart={() => setKeyboardVisible(true)}
                  />
                  {/* error message */}
                  {!!error && (
                    <Text className="text-red-500 text-xs">
                      {error?.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View>
                  <Text className="text-yellow font-bold mb-2">
                    Your password
                  </Text>
                  <TextInput
                    value={value || ""}
                    className="bg-white rounded-md p-3 mb-1"
                    onChangeText={onChange}
                    secureTextEntry={true}
                    onSubmitEditing={onSubmit}
                    onTouchStart={() => setKeyboardVisible(true)}
                  />
                  {/* error message */}
                  {!!error && (
                    <Text className="text-red-500 text-xs">
                      {error?.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
      <AnimatePresence>
        {!isKeyboardVisible && (
          <MotiView
            className="absolute bottom-0 left-0 mb-10 px-10"
            style={{ width: windowWidth }}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <View className="mb-3 flex-row justify-center items-center gap-x-2">
              <Text className="text-center text-white">
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text className="text-center text-yellow underline">
                  Register here
                </Text>
              </TouchableOpacity>
            </View>
            <Button backgroundColorFilled={true} onPress={onSubmit}>
              Login
            </Button>
          </MotiView>
        )}
      </AnimatePresence>
    </AppWrapper>
  );
};
