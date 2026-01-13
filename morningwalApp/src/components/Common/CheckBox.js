import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
// type = 'circle' | 'square'
const CheckBox = ({
  type = 'square',
  checked = false,
  size = 20,
  label = '',
  onPress = () => null,
  activeColor = 'white',
  defaultColor = 'white',
  style = {},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onPress(!checked);
      }}
      style={[styles.checkbox, style]}>
      {checked && type == 'square' && (
        <Icon name="checkbox" size={size} color={activeColor} />
      )}
      {!checked && type == 'square' && (
        <Icon2 name="checkbox-blank-outline" size={size} color={defaultColor} />
      )}
      {checked && type == 'circle' && (
        <Icon name="checkmark-circle" size={size} color={activeColor} />
      )}
      {!checked && type == 'circle' && (
        <Icon2
          name="checkbox-blank-circle-outline"
          size={size}
          color={defaultColor}
        />
      )}
      {label && (
        <Text style={[styles.label, {color: defaultColor}]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',    
  },
  label: {
    fontSize: 14,
    marginLeft:6,
  },
});
