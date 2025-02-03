import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
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
  import {Base_url, Login_user, Register_user} from '../utils/Strings';
  import Loader from '../components/Loader';
  import {useNavigation} from '@react-navigation/native';
  import { setUserData } from '../utils/UserContext';
  
  const Signup = () => {
    const navigation = useNavigation();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [badEmail, setBadEmail] = useState('');
    const [badPassword, setBadPassword] = useState('');
    const [badUsername, setBadUsername] = useState('');
    const [badMobille, setBadMobile] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedGender, setSelectedGender] = useState(0);
  
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
  
      if (username == '') {
        setBadUsername('Please Enter Username');
        isValid = false;
      } else if (username != '') {
        setBadUsername('');
        isValid = true;
      }
  
      if (mobile == '') {
        setBadMobile('Please Enter Mobile Number');
        isValid = false;
      } else if (mobile != '' && mobile.length < 10) {
        setBadMobile('Please Enter Valid Mobile Number');
        isValid = false;
      } else if (mobile != '' && mobile.length == 10) {
        setBadMobile('');
        isValid = true;
      }
  
      return isValid;
    };
  
    const singup = () => {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Content-type', 'application/json');
      fetch(Base_url + Register_user, {
        body: JSON.stringify({
          emailId: email,
          password: password,
          username: username,
          mobile: mobile,
          gender: selectedGender == 0 ? 'Male' : 'Female',
        }),
        method: 'POST',
        headers: myHeaders,
      })
        .then(res => res.json())
        .then(json => {
          setLoading(false);
          if (json) {
           setUserData(json.userId,json.username);
          }
          navigation.navigate('Home');
        })
        .catch(err => {
          setLoading(false);
        });
    };
  
    return (
      <ScrollView style={styles.container}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <Text style={[styles.welcomeText1, {marginTop: 30}]}>Create Account</Text>
        <Text style={[styles.welcomeText1, {marginTop: 10}]}>
          in <Text style={styles.welcomeText2}>Social</Text>
        </Text>
        <CustomTextInput
          icon={require('../images/user.png')}
          placeholder={'Enter Username'}
          value={username}
          onChangeText={setUsername}
          isValid={badEmail == '' ? true : false}
        />
        {badUsername != '' && <Text style={styles.errText}>{badUsername}</Text>}
        <CustomTextInput
          icon={require('../images/mail.png')}
          placeholder={'Enter Email'}
          value={email}
          onChangeText={setEmail}
          isValid={badEmail == '' ? true : false}
        />
        {badEmail != '' && <Text style={styles.errText}>{badEmail}</Text>}
        <CustomTextInput
          icon={require('../images/telephone.png')}
          placeholder={'Enter Mobile No.'}
          value={mobile}
          onChangeText={setMobile}
          isValid={badEmail == '' ? true : false}
          keyboardType={'number-pad'}
        />
        {badMobille != '' && <Text style={styles.errText}>{badMobille}</Text>}
        <Text style={styles.heading}>Select Gender</Text>
        <View style={styles.gendersView}>
          <TouchableOpacity
            style={[
              styles.genderBtn,
              {borderColor: selectedGender == 0 ? 'green' : '#9e9e9e'},
            ]}
            onPress={() => {
              setSelectedGender(0);
            }}>
            <Image source={require('../images/male.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderBtn,
              {borderColor: selectedGender == 1 ? 'green' : '#9e9e9e'},
            ]}
            onPress={() => {
              setSelectedGender(1);
            }}>
            <Image source={require('../images/female.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
  
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
                singup();
              }
            }}>
            <Text style={styles.btnText}>SignUp</Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text
          style={styles.signupText}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Already have an Account? <Text style={styles.signUp}>Log In</Text>
        </Text>
        <Loader visible={loading} />
      </ScrollView>
    );
  };
  
  export default Signup;
  
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
      marginBottom: 100,
    },
    signUp: {
      color: Theme_color_dark,
      fontWeight: '700',
      marginLeft: 10,
    },
    heading: {
      color: Text_color,
      marginLeft: 30,
      marginTop: 20,
    },
    gendersView: {
      width: '90%',
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 20,
    },
    genderBtn: {
      width: '45%',
      height: 100,
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 40,
      height: 40,
    },
  });
  