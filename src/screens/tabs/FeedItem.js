import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const FeedItem = ({data, index}) => {
  const timeDifference = previous => {
    const current = new Date();
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerMonth * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + 'second ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + 'minute ago ';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' Day ago';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return Math.round(elapsed / msPerYear) + 'years ago';
    }
  };

  return (
    <View style={styles.feed}>
      <View style={styles.topView}>
        <View style={styles.topLeft}>
          <Image
            source={require('../../images/profile-user.png')}
            style={styles.profile}
          />
          <View>
            <Text style={styles.username}>{data.username} </Text>
            <Text style={styles.time}>
              {timeDifference(new Date(data.createdAt))}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity>
            <Image
              source={require('../../images/more.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.caption}>{data.caption}</Text>
      {data.imageUrl && (
        <Image source={{uri: data.imageUrl}} style={styles.postImage} />
      )}
    </View>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  feed: {
    width: '90%',
    paddingBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',
    marginTop: 20,
    borderRadius: 10,
  },
  topView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 25,
    tintColor: '#9e9e9e',
    marginLeft: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 5,
  },
  time: {
    fontSize: 12,
    marginTop: 3,
    marginLeft: 4,
  },
  icon: {
    width: 25,
    height: 36,
  },
  caption: {
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
