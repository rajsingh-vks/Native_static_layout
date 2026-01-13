import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../../utils/Colors';

const ErrorText = ({error = null,align='left',style={}}) => {
  return (
    <>
      {typeof error == 'string' && (
        <View style={[styles.errorBox,style]}>
          <Text style={[styles.errorTxt,{textAlign:align}]}>{error}</Text>
        </View>
      )}

      {Array.isArray(error) && error[0] && (
        <View style={[styles.errorBox,style]}>
          <Text style={[styles.errorTxt,{textAlign:align}]}>{error[0]}</Text>
        </View>
      )}
    </>
  );
};

export default ErrorText;

const styles = StyleSheet.create({
  errorBox: {
    width: '100%',
    marginTop: 2,
  },
  errorTxt: {
    color: Colors.Danger,
    fontSize: 12,
    marginStart: 5,
  },
});
