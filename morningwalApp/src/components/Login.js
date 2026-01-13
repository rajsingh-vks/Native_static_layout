import {
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from '../utils/styles';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import user from '../services/user';
import {setUser} from '../redux/userSlice';
import {showErrorToast} from '../utils/appHelpers';
import store from '../redux/store';
import {removeUser} from '../redux/userSlice';
import base64 from 'react-native-base64';
import Icon from 'react-native-vector-icons/Ionicons';
import appColors from '../utils/appColors';
import CheckBox from './Common/CheckBox';
import appStyles from '../utils/appStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../utils/env';

const Login = ({navigation}) => {
  const [fields, setFields] = useState({
    username: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [passVisible, setPassVisible] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleChange = async (val = '', field) => {
    await setFields({...fields, [field]: val});
  };

  const handleLogin = async () => {
    if (env.mode === 'dev') {
      await dispatch(
        setUser({
          url: env.baseURL,
          institute_id: env.testInstituteID,
        }),
      );
      handleSubmit();
    } else if (env.mode === 'prod') {
      getSubDomain();
    }
  };

  const handleSubmit = () => {
    setError(null);
    setSubmitted(true);
    user
      .login({
        ...fields,
        username: base64.encode(
          fields?.username?.split('-')[1] || fields?.username?.split('-')[0],
        ),
        password: base64.encode(fields?.password),
      })
      .then(async res => {
        setSubmitted(false);
        if (res?.success && res?.user) {
          dispatch(setUser(res.user));
          // Save credential
          if (remember) {
            AsyncStorage.setItem(
              'login',
              JSON.stringify({
                username: fields?.username || '',
                password: fields?.password || '',
              }),
            );
          } else {
            AsyncStorage.removeItem('login');
          }
        } else {
          setError(res.message);
        }
      })
      .catch(function (error) {
        setSubmitted(false);
        showErrorToast(error.message);
      });
  };

  const getSubDomain = () => {
    // clear url
    store.dispatch(removeUser());
    setError(null);
    setSubmitted(true);
    user
      .verifySubDomain({prefix: fields?.username?.split('-')[0] || ''})
      .then(async res => {
        setSubmitted(false);
        if (res?.success) {
          console.log(`# Sub-domain URL ------- ${res?.url}`);
          await dispatch(
            setUser({
              url: res.url,
              institute_id: base64.decode(res?.id),
            }),
          );
          await handleSubmit();
        } else {
          setError(res.message);
        }
      })
      .catch(function (error) {
        setSubmitted(false);
        showErrorToast(error.message);
      });
  };

  const getSavedLogin = async () => {
    let login = await AsyncStorage.getItem('login');
    if (login) {
      login = await JSON.parse(login);
      // dispatch(setLogin(login));
      setFields({...fields, ...login});
      setRemember(true);
    }
  };
  useEffect(() => {
    console.log(styles.authWrapper);
    getSavedLogin();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <ImageBackground
            source={require('../assets/images/login_bakground.png')}
            style={styles.backgroundContainer}>
            <View style={styles.authWrapper}>
              <View style={styles.authTitleWrapper}>
                <Text style={styles.authTitle}>Login</Text>
              </View>
              <View style={[styles.inputwrapper, {marginBottom: 15}]}>
                <TextInput
                  value={fields?.username}
                  placeholder="Username"
                  placeholderTextColor="#CDCDCD"
                  style={styles.inputArea}
                  autoCapitalize="none"
                  onChangeText={async val => {
                    if (
                      env.mode === 'prod' &&
                      fields?.username?.length < val?.length
                    ) {
                      val = val.replace(/-/g, '');
                      val = val.replace(/ /g, '');
                      let uname = '';
                      for (let i = 0; i < val.length; i++) {
                        uname =
                          uname + (i <= 2 ? val[i].toUpperCase() : val[i]);
                        if (i === 2) {
                          uname = uname + '-';
                        }
                      }
                      val = uname;
                    }
                    await handleChange(val, 'username');
                  }}
                />
              </View>
              <View style={styles.inputwrapper}>
                <TextInput
                  value={fields?.password}
                  placeholder="Password"
                  placeholderTextColor="#CDCDCD"
                  secureTextEntry={!passVisible}
                  style={styles.inputArea}
                  onChangeText={val => handleChange(val, 'password')}
                />
                <TouchableOpacity
                  onPress={() => setPassVisible(!passVisible)}
                  activeOpacity={0.7}
                  style={styles.eyeBtn}>
                  <Icon
                    name={passVisible ? 'eye' : 'eye-outline'}
                    size={23}
                    color={appColors.themeColor}
                  />
                </TouchableOpacity>
              </View>
              <CheckBox
                checked={remember}
                style={appStyles.mt3}
                onPress={() => setRemember(!remember)}
                label="Remember me"
              />
              {typeof error == 'string' && (
                <Text style={[styles.errorMsg, {marginTop: 15}]}>{error}</Text>
              )}
              <View style={styles.submitButtonWrapper}>
                <TouchableOpacity
                  disabled={submitted}
                  onPress={() => handleLogin()}
                  style={[styles.submitButton, styles.iconBtn]}>
                  <Text style={styles.submitButtonText}>Login</Text>
                  {submitted && (
                    <ActivityIndicator
                      size={20}
                      color="white"
                      style={styles.ms10}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.bottomAuth}></View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.logowrapper}>
            <Image
              resizeMode="contain"
              style={styles.logow}
              source={require('../assets/images/mw-logo.png')}></Image>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};


export default Login;
