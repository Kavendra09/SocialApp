import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';

const Splash = () => {
    const navigation = useNavigation();
    const authData = useSelector(state=>state.auth)
    useEffect(() => {
        setTimeout(() => {
          if(authData.data == null){
            navigation.navigate("Login")
          } else {
            navigation.navigate("Home")
          }
        },3000)
    },[])
  return (
    <View style={styles.container}>
      <Image source={require('../images/splashscreen.jpg')} style={styles.logo} />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: '60%',
        height: "50%",
        resizeMode: "contain"
    }
})