import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import appStyles from '../../utils/appStyles';
import Lottie from 'lottie-react-native';
import Modal from 'react-native-modal';
import appColors from '../../utils/appColors';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPopupModal,
  getProgressBar,
  setPopupModal,
} from '../../redux/appSlice';
import SpaceBox from './SpaceBox';
import {hidePopup, modalProps} from '../../utils/appHelpers';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

// Props
// type = loading | success | error | progressbar

const ShowPopup = () => {
  const popup = useSelector(getPopupModal);
  const progressBar = useSelector(getProgressBar);
  const dispatch = useDispatch();
  const isCloseEnable = () => {
    if (popup.type == 'success' || popup.type == 'error') {
      return true;
    } else {
      return false;
    }
  };
  return (
    popup.visible && (
      <Modal
        {...modalProps.zoom}
        isVisible={popup.visible}
        style={[appStyles.modalContainer]}
        onBackdropPress={() => (isCloseEnable() ? hidePopup() : null)}>
        <View
          style={[
            appStyles.modalBox,
            {
              minWidth: 240,
              maxWidth: 240,
              padding: 0,
              borderRadius:10
            },
          ]}>
          <View style={[appStyles.alignItemsCenter]}>
            {popup.type == 'progressbar' && (
              <View>
                <SpaceBox height={20} />
                {progressBar?.completed >= 100 && (
                  <ActivityIndicator size={40} color={appColors.themeColor} />
                )}
                {progressBar?.completed < 100 && (
                  <AnimatedCircularProgress
                    size={50}
                    width={3}
                    fill={progressBar?.completed}
                    tintColor={appColors.themeColor}
                    // onAnimationComplete={() =>
                    //   // console.log('onAnimationComplete')
                    // }
                    backgroundColor="#ccc">
                    {fill => (
                      <Text style={[appStyles.textPrimary, appStyles.fs2]}>
                        {progressBar?.completed}%
                      </Text>
                    )}
                  </AnimatedCircularProgress>
                )}
                <SpaceBox height={20} />
              </View>
            )}
            {popup.type == 'loading' && (
              <ActivityIndicator
                size={40}
                color={appColors.themeColor}
                style={appStyles.my5}
              />
            )}
            {popup.type == 'success' && (
              <Lottie
                source={require('../../assets/lottie/check.json')}
                autoPlay={true}
                loop={false}
                style={{height: 100, width: 100}}
              />
            )}
            {popup.type == 'error' && (
              <Lottie
                source={require('../../assets/lottie/error.json')}
                autoPlay={true}
                loop
                style={[{height: 70, width: 70}, appStyles.mt2, appStyles.mb3]}
              />
            )}
            <Text
              style={[
                {marginTop: -15, color: appColors.dark500},
                appStyles.fs2,
                appStyles.textCenter,
                appStyles.px5,
                appStyles.py1,
                appStyles.lineHeight,
              ]}>
              {popup.message}
            </Text>
          </View>
          {isCloseEnable() ? (
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  setPopupModal({
                    visible: false,
                    message: '',
                    type: '',
                  }),
                );
              }}
              style={styles.closeBtn}
              activeOpacity={0.4}>
              <Text style={styles.closeTxt}>Close</Text>
            </TouchableOpacity>
          ) : (
            <SpaceBox height={20} />
          )}
        </View>
      </Modal>
    )
  );
};

export default ShowPopup;

const styles = StyleSheet.create({
  closeBtn: {
    marginTop: 20,
    paddingVertical: 12,
    borderColor: '#ccc',
    borderTopWidth: 0.3,
  },
  closeTxt: {
    color: appColors.dark500,
    fontSize: 13,
    textAlign: 'center',
    fontWeight:'600'
  },
});
