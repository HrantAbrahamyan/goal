import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@HrantGoal_${key}`, jsonValue);
  } catch (exception) {
    throw exception;
  }
};

const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@HrantGoal_${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (exception) {
    throw exception;
  }
};

const removeData = async key => {
  try {
    await AsyncStorage.removeItem(`@HrantGoal_${key}`);
  } catch (exception) {
    throw exception;
  }
};

export default {
  getData,
  storeData,
  removeData,
};
