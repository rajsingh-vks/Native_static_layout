import React from 'react';
import {View, TouchableOpacity, Text, ImageBackground, Image, StatusBar} from 'react-native';
import styles from '../../utils/styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import HeaderBg from '../../assets/svg/header-bg.svg';
import appColors from '../../utils/appColors';
import SpaceBox from './SpaceBox';
import {maxChar} from '../../utils/appHelpers';

const Header = ({type = 'default', title = '', subTitle = '', titleAlign = 'center', rightIconComponent = null}) => {
  const navigation = useNavigation();
  return (
    <>
      {type == 'default' && (
        <>
          {/* <SpaceBox height={50} /> */}
          <View style={[styles.headerContainer, {backgroundColor:"#FFFFFF"}]}>
            <View style={[styles.headerBox, {paddingLeft:30}]}>
              <View style={[styles.headerTitleSection, {width:'100%'}]}>
                <Text style={[styles.homeTitle, {fontSize:17, textAlign:'center'}]}>{maxChar(title, 40)}</Text>
              </View>
            </View>
          </View>
        </>
      )}

      {type == 'logo' && (
        <>
          <StatusBar
            animated={true}
            backgroundColor="#378ccc"
          />
          <View style={[styles.headerContainer, {backgroundColor:"#378ccc"}]}>

            <View style={styles.headerBox}>
              <View style={styles.headerIcon1}>
                <Image
                style={{height:60, width:60}}
                resizeMode='cover'
                source={require('../../assets/images/mw-logo-w.png')}></Image>
              </View>
              
              <View style={[styles.headerTitleSection]}>
                <Text style={[styles.homeTitle, {color: '#fff'}]}>{maxChar(title, 25)}</Text>
                <Text style={[styles.homeSubTitle, {color: '#fff'}]}>{maxChar(subTitle, 25)}</Text>
              </View>

              <TouchableOpacity
                  onPress={() => navigation.navigate('Wallet')}>
                  <View style={[styles.headerIcon2, {alignItems:'center'}]}>
                    <Icon name="wallet-outline" color="#fff" size={24} />
                  </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {type == 'productList' && (
        <>
          {/* <SpaceBox height={50} /> */}
          
          <View style={[styles.headerContainer]}
          >
            {/* <HeaderBg fill={appColors.themeColor} height={100} /> */}
            <View style={styles.headerBox}>
              <TouchableOpacity
                style={styles.backIcon}
                onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={25} color="#2388c9" />
              </TouchableOpacity>
              <View style={[{flexDirection: 'column'}]}>
                <Text style={[styles.headerTitle, {fontWeight:'500', textAlign:'center'}]}>
                  {maxChar(title, 25)}
                </Text>
                <Text style={[styles.homeSubTitle]}>{maxChar(subTitle, 25)}</Text>
              </View>
              <View style={[styles.headerIcon2, {marginLeft:0, alignItems:'center'}]}>
                {rightIconComponent}
              </View>
            </View>
          </View>
        </>
      )}


      {type == 'productDetails' && (
        <>
          {/* <SpaceBox height={50} /> */}
          <View style={[styles.headerContainer]}
          >
            {/* <HeaderBg fill={appColors.themeColor} height={100} /> */}
            <View style={styles.headerBox}>
              <TouchableOpacity
                style={styles.backIcon}
                onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={25} color="#2388c9" />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {type == 'back' && (
        <>
          {/* <SpaceBox height={50} /> */}
          <View style={[styles.headerContainer, {backgroundColor:"#FFFFFF"}]}>
            {/* <HeaderBg fill={appColors.themeColor} height={100} /> */}
            <View style={styles.headerBox}>
              <TouchableOpacity
                style={styles.backIcon}
                onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={25} color="#2388c9" />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, {fontWeight:'500', textAlign:'center'}]}>
                {maxChar(title, 25)}
              </Text>
              <View style={[styles.headerIcon2, {marginLeft:0, alignItems:'center'}]}>
                {rightIconComponent}
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default Header;
