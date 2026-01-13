import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../../utils/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import user from '../../../services/user';
import moment from 'moment';
import Header from '../../Common/Header';
import ProfileImage from '../../Common/ProfileImage';
import appStyles from '../../../utils/appStyles';

import Icon from 'react-native-vector-icons/Feather';
import SpaceBox from '../../Common/SpaceBox';
import appColors from '../../../utils/appColors';
import {showErrorToast} from '../../../utils/appHelpers';

const Settings = ({navigation}) => {
  const [overlayLoader, setOverlayLoader] = useState(true);
  const [data, setData] = useState({});

  const loadProfile = () => {
    setOverlayLoader(true);
    user
      .getProfile()
      .then(res => {
        setOverlayLoader(false);
        if (res?.success) {
          setData(res.profile);
        }
      })
      .catch(function (error) {
        setOverlayLoader(false);
        showErrorToast(error.message);
      });
  };

  useEffect(() => {
    //loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="My Account" type="default"/>
      <ScrollView
        style={styles.dashboardSection}
        vertical
        showsHorizontalScrollIndicator={false}>
        <SpaceBox />
        
        <View>
          <TouchableOpacity 
            onPress={() => {
              navigation.navigate('Wallet');
            }}
            style={styles.btnTrans}>
            <Text style={styles.btnTransText}>Resend</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <Spinner visible={overlayLoader} /> */}
    </View>
  );
};

export default Settings;
