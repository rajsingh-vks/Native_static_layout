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

import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import user from '../services/user';
import {setUser} from '../redux/userSlice';
import OtpTimer from './Common/OtpTimer';
import styles from '../utils/styles';
import appColors from '../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';

const ValidateOTP = ({navigation, route}) => {

  const [fields, setFields] = useState({
    phone: '',
  });

  const dispatch = useDispatch();
  
  const [mobile, setMobile] = useState(route.params?.mobile);
  const [timer, setTimer] = useState(30);
  const [resend, setResend] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);

  const [otp1, setOTP1] = useState('');
  const [otp2, setOTP2] = useState('');
  const [otp3, setOTP3] = useState('');
  const [otp4, setOTP4] = useState('');

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const resendOTP = async (mobile) => {
    const pattern = new RegExp("^[0-9]{10}$");

    setLoader(true);

    // Check mobile number and sent for OTP
    if (pattern.test(mobile)) {
      user
      .resendOTP({
        phone: mobile,
      })
      .then(async res => {
        setSubmitted(false);
        setLoader(false);

        if(res?.status && res.status == true){
          setTimer(30);
          setResend(false);
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

  const verifyOTP = async () => {

    // Check mobile number and sent for OTP
    if (otp1 != '' && otp2 != '' && otp3 != '' && otp4 != '') {
      setSubmitted(true);
      setError("");

      user
      .verifyOTP({
        phone: mobile,
        otp:otp1+otp2+otp3+otp4,
      })
      .then(async res => {

        if(res?.status && res.status == true){
          setRemember(true);
          handleSubmit();
        }else if(res?.status && res.status == false){
          Alert.alert('Info', res.msg, [
            {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
          ]);
        }
        setSubmitted(false);
      })
      .catch(function (error) {
        console.log(error);
        setSubmitted(false);
        Alert.alert('Info', error.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
        ]);
      });

    } else {
      setSubmitted(false);
      Alert.alert('Info', 'Please enter Valid OTP', [
        {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
      ]);

      return false;
    }
  };

  const handleSubmit = () => {
    setError(null);
    setSubmitted(true);

    user
      .mobileLogin({
        ...fields,
        phone: mobile,
      })
      .then(async res => {
        setSubmitted(false);

        if (res?.status && res?.data?.user) {

          /* Set token value to user object because token value is not inside user object which has to be accessed */
          res.data.user.token = res.data.token;

          /* Set user and dispatch to redux store */
          dispatch(setUser(res.data.user));
          
          /*  Save credential */
          if (remember) {
            AsyncStorage.setItem(
              'login',
              JSON.stringify({
                phone: res.data.user.phone || '',
              }),
            );
          } else {
            AsyncStorage.removeItem('login');
          }
        } else {
          Alert.alert('Info', res.msg, [
            {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
          ]);
        }
      })
      .catch(function (error) {
        setSubmitted(false);
        Alert.alert('Info', error.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
        ]);
      });
  };

  const getSavedLogin = async () => {
    let login = await AsyncStorage.getItem('login');
    if (login) {
      login = await JSON.parse(login);
      setFields({...fields, ...login});
      setRemember(true);
    }
  };
  useEffect(() => {
    getSavedLogin();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.startContainer}>
              <View style={{alignItems:'flex-start', marginBottom:15}}>
                <TouchableOpacity 
                  style={{height:25, paddingRight:15,}}
                  onPress={() => {
                    navigation.navigate('Start', {
                      mobile: mobile,
                    });
                  }}
                  >
                  <Text style={[styles.continueButtonText, {fontSize:16, height:30, paddingRight:15}]}>
                    <Icon
                      name={'arrow-back-outline'}
                      size={25}
                      color={appColors.dark100}
                    />
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{marginVertical:10}}>
                <Text style={styles.startTitle}>OTP Verification</Text>
              </View>
              <View style={{marginBottom:10}}>
                <Text style={{fontSize:13, fontWeight:'400'}}>
                  Verification code sent to 
                  <Text style={{fontSize:13, fontWeight:'600'}}> +91-{mobile}</Text>
                </Text>
              </View>

              {/* <>OTP Start</> */}
              <View style={[styles.inputwrapper, {flexDirection:'row', marginBottom: 5, alignItems:'center'}]}>
                <TextInput 
                  style={[styles.input, {borderColor:ref1.current ? '#2296d2' : '#cccccc', fontSize: 16, marginRight:10, paddingHorizontal: 10, paddingVertical: 5, textAlign:'center', width:35}]}
                  placeholder="#"
                  placeholderTextColor="#AAAAAA"
                  autoFocus={true}
                  maxLength={1}
                  returnKeyType='done'
                  numeric
                  keyboardType={'number-pad'}
                  value={otp1}
                  ref={(ref) => (ref1.current = ref)}
                  onChangeText={(value) => {
                    if (value.length > 0) {
                      setOTP1(value);
                      ref2.current?.focus();
                    }else if(value.length == 0){
                      setOTP1(value);
                    }
                  }}
                />
                <TextInput 
                  style={[styles.input, {borderColor:'#2296d2', fontSize: 16, marginRight:10, paddingHorizontal: 10, paddingVertical: 5, textAlign:'center', width:35}]}
                  placeholder="#"
                  placeholderTextColor="#AAAAAA"
                  maxLength={1}
                  returnKeyType='done'
                  numeric
                  keyboardType={'number-pad'}
                  value={otp2}
                  ref={(ref) => (ref2.current = ref)}
                  onChangeText={(value) => {
                    if (value.length > 0) {
                      setOTP2(value);
                      ref3.current?.focus();
                    }else if(value.length == 0){
                      setOTP2(value);
                    }
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    if(nativeEvent.key === 'Backspace'){
                      if(otp2.length == 0){
                        ref1.current?.focus();
                      }
                    }
                  }}
                />
                <TextInput 
                  style={[styles.input, {borderColor:'#2296d2', fontSize: 16, marginRight:10, paddingHorizontal: 10, paddingVertical: 5, textAlign:'center', width:35}]}
                  placeholder="#"
                  placeholderTextColor="#AAAAAA"
                  maxLength={1}
                  returnKeyType='done'
                  numeric
                  keyboardType={'number-pad'}
                  value={otp3}
                  ref={(ref) => (ref3.current = ref)}
                  onChangeText={(value) => {
                    if (value.length > 0) {
                      setOTP3(value);
                      ref4.current?.focus();
                    }else if(value.length == 0){
                      setOTP3(value);
                    }
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    if(nativeEvent.key === 'Backspace'){
                      if(otp3.length == 0){
                        ref2.current?.focus();
                      }
                    }
                  }}
                />
                <TextInput 
                  style={[styles.input, {borderColor:'#2296d2', fontSize: 16, marginRight:10, paddingHorizontal: 10, paddingVertical: 5, textAlign:'center', width:35}]}
                  placeholder="#"
                  placeholderTextColor="#AAAAAA"
                  maxLength={1}
                  returnKeyType='done'
                  numeric
                  keyboardType={'number-pad'}
                  value={otp4}
                  ref={(ref) => (ref4.current = ref)}
                  onChangeText={(value) => {
                    setOTP4(value);
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    if(nativeEvent.key === 'Backspace'){
                      if(otp4.length == 0){
                        ref3.current?.focus();
                      }
                    }
                  }}
                />
              </View>
              {typeof error == 'string' && (
                <Text style={[styles.errMsg, {textAlign:'left'}]}>{error}</Text>
              )}
              {/* <>OTP End</> */}

              {/* <>Resend Start</> */}
              <View style={{flexDirection: 'row', alignItems: 'center', height: 80, marginVertical:5}}>
                <Text style={{fontSize:13, fontWeight:'400', textAlign:'left', marginRight:5}}>
                  Didn't receive the OTP? 
                </Text>
                { resend == false && (
                <OtpTimer 
                  active = {true} 
                  timer = {timer}
                  onComplete = {(complete) => {
                    setResend(complete);
                  }}
                />
                )}
                
                { resend == true && (
                  <TouchableOpacity
                    disabled={submitted}
                    onPress={() => {
                      resendOTP(mobile);
                    }}
                    style={styles.btnTrans}>
                    <Text style={styles.btnTransText}>Resend</Text>
                    {loader && (
                      <ActivityIndicator
                        size={10}
                        color="black"
                        style={styles.ms10}
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>
              {/* <>Resend End</> */}

              <View style={[styles.continueButtonWrapper, {marginBottom:55}]}>
                <TouchableOpacity
                  disabled={submitted}
                  onPress={() => verifyOTP()}
                  style={[styles.continueButton, styles.loaderBtn, {backgroundColor: '#2296d2'}]}>
                  <Text style={[styles.continueButtonText, {fontSize:16}]}>Verify to Proceed</Text>
                  {submitted && (
                    <ActivityIndicator
                      size={20}
                      color="white"
                      style={styles.ms10}
                    />
                  )}
                </TouchableOpacity>
              </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ValidateOTP;
