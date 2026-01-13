import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileImage = ({
  src,
  name,
  size = 50,
  style = {},
  bgColor = appColors.themeColor,
}) => {
  return src ? (
    <Image
      source={{uri: src}}
      style={[
        styles.imgAndTxt,
        {height: size, width: size, backgroundColor: bgColor},
        style,
      ]}
    />
  ) : name ? (
    <View
      style={[
        styles.imgAndTxt,
        {height: size, width: size, backgroundColor: bgColor},
        style,
      ]}>
      <Text style={[styles.nameTxt, {fontSize: size - 20}]}>
        {name?.charAt(0)}
      </Text>
    </View>
  ) : (
    <View
      style={[
        styles.iconImgBox,
        {height: size, width: size, backgroundColor: 'white'},
        style,
      ]}>
      <Icon
        name="person-circle-sharp"
        size={size + 10}
        color={bgColor}
        style={{marginTop: -7.5, marginLeft: -4.2}}
      />
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  imgAndTxt: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameTxt: {
    borderWidth: 0,
    fontSize: 28,
    color: 'white',
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  iconImgBox: {
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
