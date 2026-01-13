import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../utils/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {removeUser} from '../redux/userSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import appColors from '../utils/appColors';
import appStyles from '../utils/appStyles';
import FooterBg from '../assets/svg/footer-bg.svg';

const DrawerLayout = props => {
  const dispatch = useDispatch();

  const logout = async () => {
    await dispatch(removeUser());
  };

  return (
    <View style={styles.drawerBackground}>
      {/* <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#fff'}}>
        <View style={styles.drawerTopWrapper}>
          <Image
            resizeMode="contain"
            style={[styles.drawerLogo]}
            source={require('../assets/images/SignalHRM-logo.png')}
          />
        </View>
        <View style={styles.drawerListing}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.drawerBottomListingWrapper}>
        <TouchableOpacity onPress={() => logout()} style={styles.drawerlogout}>
          <Icon name="power" size={30} color={appColors.themeColor}  />
        </TouchableOpacity>
        <Text style={[appStyles.fs2,appStyles.textSecondary,appStyles.mt2]}>Logout</Text>
      </View>
      <FooterBg fill={appColors.themeColor} style={styles.footerBg} /> */}
    </View>
  );
};

export default DrawerLayout;
