import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../screens/Splash";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/HomeScreen";
import AddPost from "../screens/AddPost";

const Stack = createStackNavigator();
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="AddPost" component={AddPost} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
