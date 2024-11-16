import { View, TextInput, Image, StyleSheet } from 'react-native';
import React from 'react';

const CustomTextInput = ({
  mt = 20,
  placeholder = '',
  onChangeText = () => {},
  isValid = true,
  keyboardType,
  value = '',
  icon,
  style = {},
}) => {
  return (
    <View
      style={[
        styles.container,
        { borderColor: isValid ? '#9e9e9e' : 'red', marginTop: mt },
        style,
      ]}>
      {icon && (
        <Image
          source={icon}
          style={styles.icon}
        />
      )}
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType ? keyboardType : 'default'}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    borderWidth: 0.4,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#9e9e9e',
  },
  textInput: {
    marginLeft: 20,
    flex: 1, 
  },
});

export default CustomTextInput;
