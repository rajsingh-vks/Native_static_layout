import React, {useState, useEffect} from 'react';
import {Alert, RefreshControl, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, View} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import moment from 'moment';

import {getRefresh} from '../../../redux/refreshSlice';
import {getUser} from '../../../redux/userSlice';
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


const EditAddress = ({route, navigation}) => {
  
  const [overlayLoader, setOverlayLoader] = useState(false);
  const [data, setData] = useState(null);

  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [fields, setFields] = useState({
    name: route?.params?.data?.name || '',
    locality: route?.params?.data?.locality || '',
    landmark: route?.params?.data?.landmark || '',
    area: route?.params?.data?.area || '',
    city: route?.params?.data?.city || '',
    pin_code: route?.params?.data?.pin_code || '',
    state_id: route?.params?.data?.state?.id || '',
    mobile: route?.params?.data?.mobile || '',
    alternate_phone: route?.params?.data?.alternate_phone || '',
    address_type: route?.params?.data?.address_type || 'Home',
  });

  const handleFields = values => {
    setFields({...fields, ...values});
  };

  const loadStates = (loader) => {
    setOverlayLoader(loader);

    user
      .getStates()
      .then(res => {
        setOverlayLoader(false);
        if (res?.status) {
          setStates(res.data);
        }
      })
      .catch(function (error) {
        setOverlayLoader(false);

        Alert.alert('Info', error.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
        ]);
      });
  };

  const saveAddress = (type) => {

    setErrors({});

    let validationRules = rules.saveAddress;
    let custom_err_msgs = rules.saveAddErrMsg;

    const validate = validateForm(fields, validationRules, custom_err_msgs);
    if (validate.status == false) {
      setErrors(validate.message);
      return false;
    }
    
    setOverlayLoader(true);

    if(type == 'add'){
      user
        .addAddress(fields)
        .then(res => {
          setOverlayLoader(false);

          if (res?.status) {
            navigation.goBack();
            refresh('address');
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
    }else{
      user
        .editAddress({param: route?.params?.data?.id, data:fields})
        .then(res => {
          setOverlayLoader(false);

          if (res?.status) {
            navigation.goBack();
            refresh('address');
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
  };

  useEffect(() => {
    //console.log(route?.params?.data.id);
    loadStates(true);
  }, []);

  return (
    <View style={[styles.container]}>
      <Header title="Edit Address" type='back' rightIcon='true' />

      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}>
        <ScrollView
          style={[styles.dashboardSection, {backgroundColor:appColors.themeColor50}]}
          vertical
          showsHorizontalScrollIndicator={false}>
          <SpaceBox height={10}/>

          {/* Address group boxes */}
          <View style={[styles.sectionWrapper, {paddingTop:0, paddingHorizontal:20}]}>

            <Input
              type="radio"
              label="Type of address"
              required={true}
              value={fields.address_type}
              data={[
                {Home: 'Home'},
                {Work: 'Work'},
              ]}
              //errorMessage={errors?.address_type}
              onChange={val => handleFields({address_type: val})}
            />

            <Input
              type='text'
              label="Full Name (Required)"
              required={true}
              value={fields?.name}
              placeholder="Name"
              placeholderTextColor="#CCCCCC"
              style={[styles.input, {borderColor:appColors.themeColor300, fontSize: 15, height:40, paddingHorizontal:10, paddingVertical: 5}]}
              autoCapitalize="none"
              onChange={val => handleFields({name: val})}
            />

            <Input
              type='text'
              label="Phone number (Required)"
              required={true}
              value={fields?.mobile}
              placeholder="Mobile"
              placeholderTextColor="#CCCCCC"
              style={[styles.input, {borderColor:appColors.themeColor300, fontSize: 15, height:40, paddingHorizontal:10, paddingVertical: 5}]}
              autoCapitalize="none"
              onChange={val => handleFields({mobile: val})}
            />

            <Input
              type='text'
              label="Alt. Number"
              value={fields?.alternate_phone}
              placeholder="Alt. Number"
              placeholderTextColor="#CCCCCC"
              style={[styles.input, {borderColor:appColors.themeColor300, fontSize: 15, height:40, paddingHorizontal:10, paddingVertical: 5}]}
              autoCapitalize="none"
              onChange={val => handleFields({alternate_phone: val})}
            />
            
            <Input
              type='text'
              label="House No, Building Name (Required)"
              required={true}
              value={fields?.locality}
              placeholder="Locality"
              placeholderTextColor="#CCCCCC"
              style={[styles.input, {borderColor:appColors.themeColor300, fontSize: 15, height:40, paddingHorizontal:10, paddingVertical: 5}]}
              autoCapitalize="none"
              onChange={val => handleFields({locality: val})}
            />

            <Input
              type='text'
              label="Road name, Area, Colony (Required)"
              required={true}
              value={fields?.area}
              placeholder="Area"
              placeholderTextColor="#CCCCCC"
              style={[styles.input, {borderColor:appColors.themeColor300, fontSize: 15, height:40, paddingHorizontal:10, paddingVertical: 5}]}
              autoCapitalize="none"
              onChange={val => handleFields({area: val})}
            />

            <Input
              type='text'
              label="Land Mark"
              value={fields?.landmark}
              placeholder="Land Mark"
              placeholderTextColor="#CCCCCC"
              style={[styles.input, {borderColor:appColors.themeColor300, fontSize: 15, height:40, paddingHorizontal:10, paddingVertical: 5}]}
              autoCapitalize="none"
              onChange={val => handleFields({landmark: val})}
            />

            <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
                <Input
                  type='text'
                  label="City"
                  required={true}
                  value={fields?.city}
                  placeholder="City"
                  placeholderTextColor="#CCCCCC"
                  style={[styles.input, {borderColor:appColors.themeColor300, fontSize: 15, height:40, paddingHorizontal:10, paddingVertical: 5}]}
                  autoCapitalize="none"
                  onChange={val => handleFields({city: val})}
                />
              </View>
              <View style={{flex:1, marginLeft:5}}>
                <Input
                  label="State"
                  type="select"
                  data={states.map(item => {
                    return {[item.id]: item.name};
                  })}
                  value={fields?.state_id}
                  onChange={itemValue =>
                    handleFields({state_id: parseInt(itemValue)})
                  }
                  placeholder="Select State"
                  //errorMessage={errors?.leave_category_id}
                />
              </View>
            </View>
            
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
                <Input
                  type='text'
                  label="Pin Code"
                  required={true}
                  value={fields?.pin_code.toString()}
                  placeholder="Pin Code"
                  placeholderTextColor="#CCCCCC"
                  style={[styles.input, {borderColor:appColors.themeColor300, fontSize: 15, height:40, paddingHorizontal:10, paddingVertical: 5}]}
                  autoCapitalize="none"
                  onChange={val => handleFields({pin_code: val})}
                />
              </View>
              {/* <View style={{flex:1}}>
                <Input
                  type='button'
                  label=""
                  value='Use Location'
                />
              </View> */}
            </View>
            
            <View style={[styles.continueButtonWrapper, {marginVertical:20}]}>
              <TouchableOpacity 
                onPress={() => {
                  if(route?.params?.data?.id){
                    saveAddress('edit');
                  }else{
                    saveAddress('add');
                  }
                }}
                style={[styles.btnTrans, styles.iconBtn, {backgroundColor:'#FFFFFF', borderColor:appColors.themeColor, justifyContent:'flex-start', paddingVertical:5, width:155}]}>
                <Icon name="check" size={20} color={appColors.themeColor} />
                <Text style={[styles.btnTransText, {borderWidth:0, fontSize:16, fontWeight:'600', textAlign:'center'}]}>Save Address</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Spinner visible={overlayLoader} color={appColors.themeColor} size={60} overlayColor="rgba(0, 0, 0, 0.1)"/>
    </View>
  );
};

export default EditAddress;
