import {View, Text, StyleSheet,FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Base_url, Feeds_url} from '../../utils/Strings';
import FeedItem from './FeedItem';
import { useIsFocused } from '@react-navigation/native';

const Feeds  = () => {
  const [feeds, setFeeds] = useState([]);
  const isFocused = useIsFocused()
  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    const res = await fetch(Base_url + Feeds_url);
    const json = await res.json();
    setFeeds(json.data);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={feeds}
        renderItem={({item, index}) => {
          return <FeedItem data={item} index={index} />;
        }}
      />
    </View>
  );
};

export default Feeds ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
