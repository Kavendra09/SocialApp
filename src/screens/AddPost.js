import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, {useRef, useState} from 'react';
  import {launchImageLibrary} from 'react-native-image-picker';
  import {Theme_color_dark} from '../utils/Colors';
  import {Add_post, Base_url} from '../utils/Strings';
  import axios from 'axios';
  import {getUserData} from '../utils/UserContext';
  
  const AddPost = () => {
    const ref = useRef();
    const [imageData, setImageData] = useState(null);
    const [caption, setCaption] = useState('');
  
    const openCamera = async () => {
      try {
        const res = await launchCamera({mediaType: 'photo'});
        if (!res.didCancel) {
          setImageData(res);
        }
      } catch (error) {
        console.error('Error opening camera:', error);
      }
    };
  
    const openGallery = async () => {
      try {
        const res = await launchImageLibrary({mediaType: 'photo'});
  
        if (!res.didCancel) {
          setImageData(res);
        } else {
          console.log('No image selected or picker cancelled');
        }
      } catch (error) {
        console.error('Error opening image picker:', error);
      }
    };
  
    const handlePostSubmit = async () => {
      if (imageData != null) {
        const user = await getUserData();
        const imageUri = imageData.assets[0].uri;
  
        // Prepare form data for the image and other fields
        const formData = new FormData();
        formData.append('image', {
          uri: imageUri,
          type: 'image/jpeg', // Modify based on image type
          name: 'image.jpg', // Set a name for the image
        });
        formData.append('caption', caption);
        formData.append('userId', user.userId); // Include userId
        formData.append('username', user.username); // Include username
  
        try {
          const response = await axios.post(
            `${Base_url}post/add`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          );
          console.log('Post uploaded successfully:', response.data);
        } catch (error) {
          console.error('Error uploading post:', error);
        }
      } else {
        console.log('No image selected or missing user information');
      }
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.captionBox}
          onPress={() => {
            ref.current.focus();
          }}>
          <TextInput
            value={caption}
            onChangeText={setCaption}
            ref={ref}
            placeholder="Type caption here...."
            style={styles.input}
          />
        </TouchableOpacity>
        {imageData != null && (
          <View style={styles.selectedImageView}>
            <Image
              source={{uri: imageData.assets[0].uri}}
              style={styles.selectedImage}
            />
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => {
                setImageData(null);
              }}>
              <Image
                source={require('../images/close.png')}
                style={[styles.icon, {width: 20, height: 20}]}
              />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={[styles.pickerBtn, {marginTop: 50}]}
          onPress={() => {
            openCamera();
          }}>
          <Image source={require('../images/camera.png')} style={styles.icon} />
          <Text style={styles.pickerTittle}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pickerBtn, {marginTop: 20}]}
          onPress={() => {
            openGallery();
          }}>
          <Image source={require('../images/photo.png')} style={styles.icon} />
          <Text style={styles.pickerTittle}>Open Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={caption == '' && imageData == null ? true : false}
          style={[
            styles.postBtn,
            {
              backgroundColor:
                caption == '' && imageData == null ? '#f2f2f2' : Theme_color_dark,
            },
          ]}
          onPress={() => {
            handlePostSubmit();
          }}>
          <Text style={styles.btnText}>Post Now</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default AddPost;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    captionBox: {
      width: '90%',
      height: 130,
      borderWidth: 0.4,
      alignSelf: 'center',
      marginTop: 20,
      borderRadius: 10,
      borderColor: '#9e9e9e',
      padding: 10,
    },
    input: {
      width: '100%',
    },
    pickerBtn: {
      width: '90%',
      height: 50,
      flexDirection: 'row',
      alignSelf: 'center',
      borderBottomWidth: 0.4,
      borderBottomColor: '#9e9e9e',
      alignItems: 'center',
    },
    icon: {
      width: 24,
      height: 24,
      tintColor: '#9e9e9e',
    },
    pickerTittle: {
      marginLeft: 15,
      fontSize: 18,
    },
    selectedImageView: {
      width: '90%',
      height: 200,
      marginTop: 20,
      borderRadius: 10,
      alignSelf: 'center',
    },
    selectedImage: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    removeBtn: {
      width: 40,
      height: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 10,
      right: 10,
    },
    postBtn: {
      width: '90%',
      height: 50,
      marginTop: 20,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    btnText: {
      fontSize: 16,
      color: 'white',
    },
  });
  