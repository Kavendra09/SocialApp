import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {
    BG_COLOR,
    Text_color,
    Theme_color_dark,
    Theme_color_light,
  } from '../utils/Colors';
  import CustomTextInput from '../components/CustomTextInput';
  import LinearGradient from 'react-native-linear-gradient';
  import {Base_url, Login_user} from '../utils/Strings';
  import Loader from '../components/Loader';
  import {useNavigation} from '@react-navigation/native';
  import { setUserData } from '../utils/UserContext';
  
  const Login = () => {
    const navigation = useNavigation();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [badEmail, setBadEmail] = useState('');
    const [badPassword, setBadPassword] = useState('');
    const [loading, setLoading] = useState(false);
  
    const validate = () => {
      let isValid = false;
      if (email == '') {
        setBadEmail('Please Enter Email');
        isValid = false;
      } else if (
        email != '' &&
        !email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
      ) {
        setBadEmail('Please Enter Valid Email');
        isValid = false;
      } else if (
        email != '' &&
        email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
      ) {
        isValid = true;
        setBadEmail('');
      }
      if (password == '') {
        setBadPassword('Please Enter Password');
        isValid = false;
      } else if (password != '' && password.length < 6) {
        setBadPassword('Please Enter Min 6 Characters Password');
        isValid = false;
      } else if (password != '' && password.length > 5) {
        setBadPassword('');
        isValid = true;
      }
      return isValid;
    };
  
    const logIn = () => {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Content-type', 'application/json');
      fetch(Base_url + Login_user, {
        body: JSON.stringify({
          emailId: email,
          password: password,
        }),
        method: 'POST',
        headers: myHeaders,
      })
        .then(res => res.json())
        .then(json => {
          setLoading(false);
          if (!json.status) {
            if (json.message == 'Wrong Password') {
              setBadPassword(json.message);
            } else {
              setBadEmail(json.message);
            }
          } else {
            const user = {
              userId: json.data._id, 
              username: json.data.username, 
              mobile: json.data.mobile, 
              email: json.data.emailId,
              profilePic: json.data.profilePic, 
              coverPic: json.data.coverPic, 
              gender: json.data.gender
            };
            setUserData(user);
            navigation.navigate("Home")
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    };
  
    return (
      <View style={styles.container}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <Text style={[styles.welcomeText1, {marginTop: 30}]}>Welcome Back</Text>
        <Text style={[styles.welcomeText1, {marginTop: 10}]}>
          to <Text style={styles.welcomeText2}>Social</Text>
        </Text>
        <CustomTextInput
          icon={require('../images/mail.png')}
          placeholder={'Enter Email'}
          value={email}
          onChangeText={txt => setEmail(txt)}
          isValid={badEmail == '' ? true : false}
        />
        {badEmail != '' && <Text style={styles.errText}>{badEmail}</Text>}
        <CustomTextInput
          icon={require('../images/key.png')}
          placeholder={'Enter Password'}
          value={password}
          onChangeText={txt => setPassword(txt)}
          isValid={badPassword == '' ? true : false}
        />
        {badPassword != '' && <Text style={styles.errText}>{badPassword}</Text>}
        <LinearGradient
          colors={[Theme_color_dark, Theme_color_light]}
          style={styles.btn}>
          <TouchableOpacity
            style={[
              styles.btn,
              {justifyContent: 'center', alignItems: 'center', marginTop: 0},
            ]}
            onPress={() => {
              if (validate()) {
                logIn();
              }
            }}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text
          style={styles.signupText}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          Create New Account ? <Text style={styles.signUp}>Sign Up</Text>
        </Text>
        <Loader visible={loading} />
      </View>
    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BG_COLOR,
    },
    logo: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginTop: Dimensions.get('window').height / 8,
    },
    welcomeText1: {
      color: Text_color,
      alignSelf: 'center',
      fontSize: 30,
      fontWeight: '500',
    },
    welcomeText2: {
      color: Theme_color_dark,
    },
    btn: {
      width: '90%',
      height: 55,
      alignSelf: 'center',
      marginTop: 40,
      borderRadius: 10,
    },
    btnText: {
      color: BG_COLOR,
      fontSize: 20,
      fontWeight: '600',
    },
    errText: {
      color: 'red',
      marginLeft: 20,
      marginTop: 5,
    },
    signupText: {
      fontSize: 18,
      alignSelf: 'center',
      marginTop: 40,
      fontWeight: '500',
    },
    signUp: {
      color: Theme_color_dark,
      fontWeight: '700',
      marginLeft: 10,
    },
  });
  