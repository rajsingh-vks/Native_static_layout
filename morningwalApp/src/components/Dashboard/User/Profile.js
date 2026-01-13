import React, {useState, useEffect} from 'react';
import {Alert, RefreshControl, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, View} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import {getUser, setUser} from '../../../redux/userSlice';
import user from '../../../services/user';

import rules from '../../../utils/rules';
import validateForm from '../../../utils/validateForm';
import appStyles from '../../../utils/appStyles';
import appColors from '../../../utils/appColors';
import styles from '../../../utils/styles';
import {refresh, showErrorToast, showSuccessToast} from '../../../utils/appHelpers';

import Header from '../../Common/Header';
import SpaceBox from '../../Common/SpaceBox';
import Input from '../../Common/Input';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);

  const [errors, setErrors] = useState({});
  const [overlayLoader, setOverlayLoader] = useState(false);

  const [fields, setFields] = useState({
    first_name: userData.first_name || '',
    last_name: userData.last_name || '',
    email: userData.email || '',
    phone: userData.phone || '',
    alternate_phone: userData.alternate_phone || '',
    gender: userData.gender || 'Male',
  });

  const handleFields = values => {
    setFields({...fields, ...values});
  };

  const loadProfile = (loading = false) => {console.log('pp');console.log(userData);
    setOverlayLoader(loading);

    user
      .getProfile()
      .then(res => {
        setOverlayLoader(false);
        if (res?.status) {
          /* Set user and dispatch to redux store */
          dispatch(setUser({...userData, first_name:res?.data?.first_name, last_name:res?.data?.last_name, email:res?.data?.email, phone:res?.data?.phone, alternate_phone:res?.data?.alternate_phone, gender:res?.data?.gender}));
        }
      })
      .catch(function (error) {
        setOverlayLoader(false);
        Alert.alert('Info', error.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
        ]);
      });
  };

  const saveProfile = () => {

    setErrors({});

    let validationRules = rules.saveProfile;
    let custom_err_msgs = rules.saveProfileMsg;

    const validate = validateForm(fields, validationRules, custom_err_msgs);
    if (validate.status == false) {
      setErrors(validate.message);
      return false;
    }

    setOverlayLoader(true);

    user
      .editProfile(fields)
      .then(res => {
        setOverlayLoader(false);

        if (res?.status) {
          navigation.goBack();
          // refresh('address');
        }else{
          if (typeof res?.message == 'string') {
            Alert.alert('Info', res?.message, [
              {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
            ]);
          } else {
            setErrors(res?.message);
          }
        }
      })
      .catch(function (error) {
        setOverlayLoader(false);

        Alert.alert('Info', error.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
        ]);
      });
  }

  useEffect(() => {
    loadProfile(true);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Profile" type='back'/>
      <ScrollView
        style={[styles.dashboardSection, {backgroundColor:appColors.themeColor50}]}
        vertical
        showsHorizontalScrollIndicator={false}>
        <SpaceBox height={5}/>
        
        <View style={[styles.sectionWrapper, {paddingTop:0, paddingHorizontal:20}]}>
          <Input
            type='text'
            label="First Name"
            autoCapitalize="none"
            value={fields?.first_name}
            placeholder="First Name"
            placeholderTextColor="#CCCCCC"
            bgColor='#FFFFFF'
            style={[styles.inputBox]}
            onChange={val => handleFields({first_name: val})}
            errorMessage={errors?.first_name}
          />

          <Input
            type='text'
            label="Last Name"
            value={fields?.last_name}
            placeholder="Last Name"
            placeholderTextColor="#CCCCCC"
            bgColor='#FFFFFF'
            style={[styles.inputBox]}
            autoCapitalize="none"
            onChange={val => handleFields({last_name: val})}
            errorMessage={errors?.last_name}
          />

          <Input
            type='text'
            label="Email"
            value={fields?.email}
            placeholder="Email"
            placeholderTextColor="#CCCCCC"
            bgColor='#FFFFFF'
            style={[styles.inputBox]}
            autoCapitalize="none"
            onChange={val => handleFields({email: val})}
            errorMessage={errors?.email}
          />

          <Input
            type='text'
            label="Mobile number"
            disabled={true}
            value={fields?.phone}
            placeholder="Mobile number"
            placeholderTextColor="#CCCCCC"
            bgColor='#CCCCCC'
            style={[styles.inputBox]}
            autoCapitalize="none"
            onChange={val => handleFields({phone: val})}
            errorMessage={errors?.phone}
          />

          <Input
            type='text'
            label="Alt. Number"
            value={fields?.alternate_phone}
            placeholder="Alt. Number"
            placeholderTextColor="#CCCCCC"
            bgColor='#FFFFFF'
            style={[styles.inputBox]}
            autoCapitalize="none"
            onChange={val => handleFields({alternate_phone: val})}
            errorMessage={errors?.alternate_phone}
          />

          <Input
            type="radio"
            label="Gender"
            value={fields.gender}
            data={[
              {Male: 'Male'},
              {Female: 'Female'},
              {Others: 'Others'},
            ]}
            onChange={val => handleFields({gender: val})}
            errorMessage={errors?.gender}
          />
        </View>

        <View style={[styles.continueButtonWrapper, {marginVertical:20}]}>
          <TouchableOpacity 
            onPress={() => {saveProfile();}}
            style={[styles.btnTrans, styles.iconBtn, {backgroundColor:'#FFFFFF', borderColor:appColors.themeColor, justifyContent:'flex-start', paddingVertical:5, width:120}]}>
            <Icon name="check" size={20} color={appColors.themeColor} />
            <Text style={[styles.btnTransText, {borderWidth:0, fontSize:16, fontWeight:'600', textAlign:'center'}]}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Spinner visible={overlayLoader} color={appColors.themeColor} size={60} overlayColor="rgba(0, 0, 0, 0.1)"/>
    </View>
  );
};

export default Profile;
