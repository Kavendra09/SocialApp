import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Base_url, Profile_url} from '../../utils/Strings';
import {Theme_color_light} from '../../utils/Colors';

const Profile = () => {
  const isFocused = useIsFocused();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    getProfileData();
  }, [isFocused]);

  const getProfileData = async () => {
    const res = await fetch(Base_url + Profile_url + authData.data.data._id);
    const json = await res.json();
    setUserProfile(json.data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileView}>
        <Image
          source={require('../../images/user.png')}
          style={styles.profile}
        />
      </View>
      <Text style={styles.username}>
        {userProfile ? userProfile.username : ''}
      </Text>
      <Text style={styles.emailId}>
        {userProfile ? userProfile.emailId : ''}
      </Text>
      <TouchableOpacity style={styles.editBtn}>
        <Image
          source={require('../../images/edit.png')}
          style={styles.editImage}
        />
        <Text style={styles.editBtnText}>Edit Profile</Text>
      </TouchableOpacity>
      <View style={styles.followersView}>
        <View style={styles.countView}>
          <Text style={styles.values}>
            {userProfile ? userProfile.followers.length : 0}
          </Text>
          <Text style={styles.tittle}>{' Followers '}</Text>
        </View>
        <View style={styles.countView}>
          <Text style={styles.values}>
            {userProfile ? userProfile.following.length : 0}
          </Text>
          <Text style={styles.tittle}>{' Following '}</Text>
        </View>
        <View style={styles.countView}>
          <Text style={styles.values}>{0}</Text>
          <Text style={styles.tittle}>{' Posts '}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileView: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Theme_color_light,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  profile: {
    width: 50,
    height: 50,
    tintColor: 'white',
    tintColor: 'white',
  },
  username: {
    fontSize: 25,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  emailId: {
    fontSize: 22,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 5,
  },
  editBtn: {
    width: 200,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtnText: {
    fontSize: 17,
    fontWeight: '400',
    alignSelf: 'center',
  },
  editImage: {
    width: 23,
    height: 23,
    alignSelf: 'center',
  },
  followersView: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 30,
  },
  countView: {
    alignItems: 'center',
  },
  values: {
    fontSize: 28,
    fontWeight: '600',
  },
  tittle: {
    fontSize: 20,
    marginTop: 5,
  },
});
