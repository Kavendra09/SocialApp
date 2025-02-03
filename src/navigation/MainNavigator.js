import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../screens/SplashScreen";
import Login from "../screens/Login"
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import AddPost from "../screens/AddPost";

const Stack = createStackNavigator();
const MainNavigator = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="AddPost" component={AddPost} options={{ headerShown: true }} />
      </Stack.Navigator>
  );
};

export default MainNavigator;
