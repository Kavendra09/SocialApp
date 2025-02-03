import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './src/utils/UserContext'; // Your UserProvider
import MainNavigator from './src/navigation/MainNavigator'// Your main navigation

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
