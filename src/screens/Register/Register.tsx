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
  Platform,
  EmitterSubscription,
} from "react-native";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AnimatePresence, MotiView } from "moti";

import AppWrapper from "../../components/AppWrapper";
import { registerValidationSchema } from "../../utils/validationSchemas";
import Button from "../../components/Button";
import { RouteParams } from "../../navigation/RootNavigator";
import { auth } from "../../utils/firebase-config";
import { setUserId } from "../../utils/asyncStorage";

interface FormValues {
  email: string;
  username: string;
  password: string;
}

export const Register: React.FC = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const windowWidth = Dimensions.get("screen").width;

  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  // all necessary tools to manage my form
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(registerValidationSchema),
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
      const newUser: UserCredential = await createUserWithEmailAndPassword(
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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View className="mb-10">
                  <Text className="text-yellow font-bold mb-2">Your email</Text>
                  <TextInput
                    value={value || ""}
                    className="bg-white rounded-md px-3 py-2 mb-1"
                    onChangeText={onChange}
                    keyboardType="email-address"
                    pointerEvents="none"
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
              name="username"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View className="mb-10">
                  <Text className="text-yellow font-bold mb-2">
                    Your username
                  </Text>
                  <TextInput
                    value={value || ""}
                    className="bg-white rounded-md px-3 py-2 mb-1"
                    onChangeText={onChange}
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
                    className="bg-white rounded-md px-3 py-2 mb-1"
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
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-center text-yellow underline">
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
            <Button backgroundColorFilled={true} onPress={onSubmit}>
              Register
            </Button>
          </MotiView>
        )}
      </AnimatePresence>
    </AppWrapper>
  );
};
