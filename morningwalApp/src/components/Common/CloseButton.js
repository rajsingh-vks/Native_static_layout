import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import appColors from '../../utils/appColors';
const CloseButton = ({
  size = 28,
  color = '#ccc',
  iconColor = appColors.dark500,
  onPress = () => null,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: size,
        width: size,
        backgroundColor: color,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name="close" size={size - 10} color={iconColor} />
    </TouchableOpacity>
  );
};

export default CloseButton;
