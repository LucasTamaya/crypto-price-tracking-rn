import AsyncStorage from "@react-native-async-storage/async-storage";

// register user id in a async storage
const setUserId = async (uid: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("@user_id", uid);
  } catch (error: unknown) {
    console.error(error);
  }
};

// get the user id from async storage
const getUserId = async (): Promise<string | undefined> => {
  try {
    const value: string | null = await AsyncStorage.getItem("@user_id");
    if (value !== null) {
      return value;
    } else {
      console.error("error in the getAsyncData function !");
      console.log(value);
    }
  } catch (error: unknown) {
    console.error(error);
  }
};

export { setUserId, getUserId };
