import {View, Text, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {BG_COLOR} from '../utils/Colors';

const Loader = ({visible}) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.mainView}>
        <View style={styles.loaderView}>
          <ActivityIndicator />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderView: {
    width: 80,
    height: 80,
    backgroundColor: BG_COLOR,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
