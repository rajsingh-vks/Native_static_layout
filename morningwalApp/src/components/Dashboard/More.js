import React, {useState, useEffect} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View,} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {useDispatch} from 'react-redux';

import {removeUser} from '../../redux/userSlice';
import user from '../../services/user';

import {showErrorToast, showLoading} from '../../utils/appHelpers';
import appColors from '../../utils/appColors';
import appStyles from '../../utils/appStyles';
import styles from '../../utils/styles';

import Header from '../Common/Header';
import ProfileImage from '../Common/ProfileImage';
import SpaceBox from '../Common/SpaceBox';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const More = ({navigation}) => {
  const dispatch = useDispatch();

  const logout = async () => {
    await dispatch(removeUser());
  };

  return (
    <View style={styles.container}>
      <Header title='Menu' type='default' titleAlign=''/>
      <ScrollView
        style={[styles.dashboardSection, {backgroundColor:appColors.themeColor50}]}
        vertical
        showsHorizontalScrollIndicator={false}>
        <SpaceBox height={5}/>
        
        <View style={{paddingVertical:10, marginHorizontal:10}}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Subscriptions');
              }}
              style={[styles.btnTrans, styles.iconBtn, {backgroundColor:'#FFFFFF'}]}>
              
              <Icon2 name="calendar-month-outline" size={20} color={appColors.themeColor} />
              <Text style={[styles.btnTransText, {borderWidth:0, fontSize:14, fontWeight:'600'}]}>Subscriptions</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Vacation');
              }}
              style={[styles.btnTrans, styles.iconBtn, {backgroundColor:'#FFFFFF'}]}>
              <Icon2 name="globe-model" size={20} color={appColors.themeColor} />
              <Text style={[styles.btnTransText, {borderWidth:0, fontSize:14, fontWeight:'600'}]}>My Vacation</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Orders');
              }}
              style={[styles.btnTrans, styles.iconBtn, {backgroundColor:'#FFFFFF'}]}>
              <Icon2 name="history" size={20} color={appColors.themeColor} />
              <Text style={[styles.btnTransText, {borderWidth:0, fontSize:14, fontWeight:'600'}]}>Order History</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Transactions');
              }}
              style={[styles.btnTrans, styles.iconBtn, {backgroundColor:'#FFFFFF'}]}>
              <Icon2 name="format-list-bulleted" size={20} color={appColors.themeColor} />
              <Text style={[styles.btnTransText, {borderWidth:0, fontSize:14, fontWeight:'600'}]}>Transactions</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={{paddingVertical:10, paddingHorizontal:10, backgroundColor:'#FFFFFF'}}>
          <Text style={[styles.startTitle, {fontSize:16, fontWeight:'600', marginHorizontal:10, paddingVertical:10}]}>Account Settings</Text>
          <View style={{flexDirection:'column'}}>
            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Profile');
              }}
              style={[styles.btnTrans, styles.iconBtn, {borderWidth:0, paddingVertical:2, width:'100%'}]}>
              
              <Icon name="manage-accounts" size={20} color={appColors.themeColor} />
              <Text style={[styles.btnTransText, {borderWidth:0, fontWeight:'400', fontSize:14}]}>Profile</Text>
              <Icon2 style={{marginLeft:'auto'}} name="chevron-right" size={20} color={appColors.themeColor} />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Address');
              }}
              style={[styles.btnTrans, styles.iconBtn, {borderWidth:0, paddingVertical:2, width:'100%', flexDirection:'row'}]}>
              <Icon2 name="google-maps" size={20} color={appColors.themeColor} />
              <Text style={[styles.btnTransText, {borderWidth:0, fontWeight:'400', fontSize:14}]}>Saved Adress</Text>
              <Text style={{marginLeft:'auto'}}><Icon2 name="chevron-right" size={20} color={appColors.themeColor}/></Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Wallet');
              }}
              style={[styles.btnTrans, styles.iconBtn, {borderWidth:0, paddingVertical:2, width:'100%', flexDirection:'row'}]}>
              <Icon2 name="wallet-outline" size={20} color={appColors.themeColor} />
              <Text style={[styles.btnTransText, {borderWidth:0, fontWeight:'400', fontSize:14}]}>Wallet & Saved Cards</Text>
              <Text style={{marginLeft:'auto'}}><Icon2 name="chevron-right" size={20} color={appColors.themeColor}/></Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Support');
              }}
              style={[styles.btnTrans, styles.iconBtn, {borderWidth:0, paddingVertical:2, width:'100%', flexDirection:'row'}]}>
              <Icon name="help-outline" size={20} color={appColors.themeColor} />
              <Text style={[styles.btnTransText, {borderWidth:0, fontWeight:'400', fontSize:14}]}>Help & Support</Text>
              <Text style={{marginLeft:'auto'}}><Icon2 name="chevron-right" size={20} color={appColors.themeColor}/></Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{backgroundColor:'#FFFFFF', marginTop:10, paddingVertical:10, paddingHorizontal:10, }}>
          <Text style={[styles.startTitle, {fontSize:16, fontWeight:'600', marginHorizontal:10, paddingVertical:10}]}>Feedback & Information</Text>
          <View style={{flexDirection:'column'}}>
            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Terms');
              }}
              style={[styles.btnTrans, styles.iconBtn, {borderWidth:0, paddingVertical:2, width:'100%'}]}>
              
              <Icon name="content-copy" size={20} color={appColors.themeColor} />
              <Text style={[styles.btnTransText, {borderWidth:0, fontWeight:'400', fontSize:14}]}>Terms & Policies</Text>
              <Icon2 style={{marginLeft:'auto'}} name="chevron-right" size={20} color={appColors.themeColor} />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Faqs');
              }}
              style={[styles.btnTrans, styles.iconBtn, {borderWidth:0, paddingVertical:2, width:'100%', flexDirection:'row'}]}>
              <Icon2 name="file-document-outline" size={20} color={appColors.themeColor} />
              <Text style={[styles.btnTransText, {borderWidth:0, fontWeight:'400', fontSize:14}]}>Browse FAQs</Text>
              <Text style={{marginLeft:'auto'}}><Icon2 name="chevron-right" size={20} color={appColors.themeColor}/></Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.continueButtonWrapper, {marginVertical:20}]}>
          <TouchableOpacity 
            onPress={() => logout()}
            style={[styles.btnTrans, styles.iconBtn, {backgroundColor:'#FFFFFF', justifyContent:'center'}]}>
            <Icon name="logout" size={20} color={appColors.themeColor} />
            <Text style={[styles.btnTransText, {borderWidth:0, fontSize:14, fontWeight:'600', textAlign:'center'}]}>Logout</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
      {/* <Spinner visible={overlayLoader} /> */}
    </View>
  );
};

export default More;
