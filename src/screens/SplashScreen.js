import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { getUserData } from '../utils/UserContext';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const user = getUserData();
    if (user) {
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
  }, []);

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreen;
