import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import user from '../services/user';
import styles from '../utils/styles';
import Icon from 'react-native-ico-flags';

const Start = ({navigation}) => {
  
  const [submitted, setSubmitted] = useState(false);
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null);

  const sendOTP = async (mobile) => {

    const pattern = new RegExp("^[0-9]{10}$");

    // Check mobile number and sent for OTP
    if (pattern.test(mobile)) {
      setSubmitted(true);
      setError("");

      user
      .sendOTP({
        phone: mobile,
      })
      .then(async res => {
        setSubmitted(false);
        if(res?.status && res.status == true){
          navigation.navigate('ValidateOTP', {
            mobile: mobile,
          });
        }
      })
      .catch(function (error) {
        setSubmitted(false);
        Alert.alert('Info', error.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
        ]);
      });

    } else {
      setSubmitted(false);
      Alert.alert('Info', 'Invalid mobile number.', [
        {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
      ]);
      return false;
    }
  };

  useEffect(() => {
    //If needed 
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={[styles.startContainer, {paddingBottom:40}]}>
              <View style={styles.startTitleWrapper}>
                <Text style={styles.startTitle}>Get Started</Text>
              </View>
              <View style={[styles.inputwrapper, {marginBottom: 5}]}>
                <Icon
                  name="india"
                  height={30}
                  width={30}
                  style={{position: 'absolute', zIndex: 1, left: 5, top: 4}}
                />
                <TextInput 
                  style={[styles.input, {borderColor:'#2296d2', fontSize: 16, paddingLeft:40, paddingRight: 10, paddingVertical: 10}]}
                  placeholder="Enter Mobile Number"
                  placeholderTextColor="#AAAAAA"
                  autoFocus={true}
                  maxLength={10}
                  returnKeyType='done'
                  numeric
                  keyboardType={'phone-pad'}
                  onChangeText={(mobile) => {
                    const pattern = new RegExp("^[0-9]{10}$");
                    if (pattern.test(mobile)) {
                      setError("");
                    }
                    setMobile(mobile);
                  }}
                />
              </View>
              {typeof error == 'string' && (
                <Text style={[styles.errMsg]}>{error}</Text>
              )}
              <View style={[styles.continueButtonWrapper]}>
                <TouchableOpacity
                  disabled={submitted}
                  onPress={() => {
                    sendOTP(mobile);
                  }}
                  style={[styles.continueButton, styles.loaderBtn, {backgroundColor: '#2296d2'}]}>
                  <Text style={styles.continueButtonText}>Continue</Text>
                  {submitted && (
                    <ActivityIndicator
                      size={20}
                      color="white"
                      style={styles.ms10}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View style={{justifyContent: 'center', marginTop: 5, marginBottom: 5}}>
                <Text style={{textAlign: 'center'}}>By continuing, you agree to our</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontWeight: '700', paddingHorizontal: 5}}>Terms of Service</Text>
                <Text>and</Text>
                <Text style={{fontWeight: '700', paddingHorizontal: 5}}>Privacy Policy</Text>
              </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};


export default Start;
