import React, {useState, useEffect} from 'react';
import SpInAppUpdates from 'sp-react-native-in-app-updates';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import Modal from 'react-native-modal';
import appStyles from '../../utils/appStyles';
import appColors from '../../utils/appColors';
import Lottie from 'lottie-react-native';
import SpaceBox from './SpaceBox';
import user from '../../services/user';
import {modalProps} from '../../utils/appHelpers';

export default CheckForUpdate = () => {
  const appUpdate = new SpInAppUpdates();
  const [appData, setAppData] = useState({
    needsUpdate: false,
    otherData: null,
  });
  // Load App settings
  const loadAppSettings = () => {
    user
      .getAppSettings()
      .then(res => {
        if (res.success) {
          // App update initialize
          if (res?.settings?.update_required == 1) {
            appUpdate.checkNeedsUpdate().then(data => {
              if (data.shouldUpdate) {
                setAppData({
                  needsUpdate: true,
                  otherData: null,
                });
              }
            });
          }
        }
      })
      .catch(function (error) {
        //
      });
  };

  useEffect(() => {
    loadAppSettings();
  }, []);
  return (
    appData.needsUpdate && (
      <Modal
        {...modalProps.zoom}
        isVisible={true}
        style={appStyles.modalContainer}>
        <View style={[appStyles.modalBox, {maxWidth: 270}]}>
          <Lottie
            source={require('../../assets/lottie/download.json')}
            autoPlay
            loop
            style={{transform: [{scale: 1.3}], marginTop: -40}}
          />
          <SpaceBox height={80} />
          <Text
            style={[
              {color: appColors.dark500},
              appStyles.fw600,
              appStyles.fs4,
              appStyles.textCenter,
            ]}>
            App Update Required!
          </Text>
          <Text
            style={[
              {color: appColors.dark600},
              appStyles.fs2,
              appStyles.px4,
              appStyles.textCenter,
              appStyles.mt2,
            ]}>
            For more features and better user experience, please update this
            app.
            {/* We have added new features and fixed some bugs to make your experience
          seamless. */}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.signalhrm',
              )
            }
            activeOpacity={0.7}
            style={[
              appStyles.btn,
              appStyles.shadow2,
              {width: 150, zIndex: 2},
              appStyles.alignSelfCenter,
              appStyles.my3,
            ]}>
            <Text style={appStyles.btnTxt}>Update Now</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  );
};
