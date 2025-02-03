import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Theme_color_dark} from '../utils/Colors';
  import {useNavigation} from '@react-navigation/native';
  import Feeds from './tabs/Feeds';
  import Profile from './tabs/Profile';
  
  const Home = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.tittle}>Social</Text>
        {selectedTab == 0 ? <Feeds /> : <Profile />}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(0);
            }}>
            <Image
              source={
                selectedTab == 0
                  ? require('../images/home2.png')
                  : require('../images/home.png')
              }
              style={[
                styles.tabIcon,
                {tintColor: selectedTab == 0 ? Theme_color_dark : null},
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              navigation.navigate('AddPost');
            }}>
            <Image
              source={require('../images/add.png')}
              style={[styles.tabIcon, {tintColor: 'white'}]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(1);
            }}>
            <Image
              source={
                selectedTab == 1
                  ? require('../images/user2.png')
                  : require('../images/user.png')
              }
              style={[
                styles.tabIcon,
                {tintColor: selectedTab == 1 ? Theme_color_dark : null},
              ]}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default Home;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    tittle: {
      color: Theme_color_dark,
      fontWeight: '700',
      fontSize: 28,
      marginLeft: 20,
      marginBottom: 10
    },
    bottomNav: {
      width: '100%',
      height: 70,
      position: 'absolute',
      bottom: 10,
      backgroundColor: '#f2f2f2',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    bottomTab: {
      width: '25%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabIcon: {
      width: 32,
      height: 32,
    },
    addBtn: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: Theme_color_dark,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
  });
  