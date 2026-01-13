import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import appColors from '../../utils/appColors';
import Modal from 'react-native-modal';
import appStyles from '../../utils/appStyles';

const ConfirmationModal = ({
  visible = false,
  setVisible = () => null,
  title = 'Confirmation!',
  message = 'Are you sure to proceed?',
  okText = 'Confirm',
  cancelText = 'Cancel',
  onOk = () => null,
  onCancel = () => null,
}) => {
  return (
    <Modal
      isVisible={visible}
      animationOut="slideOutDown"
      animationOutTiming={1000}
      backdropTransitionOutTiming={1000}
      useNativeDriverForBackdrop={true}
      onBackdropPress={() => setVisible(false)}
      swipeDirection="down"
      onSwipeComplete={() => setVisible(false)}
      style={appStyles.modalBottomContainer}>
      <View style={[appStyles.modalBottomBox]}>
        <Text
          style={[
            {color: appColors.dark400},
            appStyles.fw600,
            appStyles.fs5,
            appStyles.textCenter,
            appStyles.mt4,
          ]}>
          {title}
        </Text>
        <Text
          style={[
            {color: appColors.dark600},
            appStyles.fw500,
            appStyles.fs3,
            appStyles.textCenter,
            appStyles.mt3,
            appStyles.px5,
          ]}>
          {message}
        </Text>
        <View
          style={[
            appStyles.row,
            appStyles.justifyContentCenter,
            appStyles.py5,
          ]}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              onCancel();
            }}
            style={[appStyles.btn, {backgroundColor: appColors.gray}]}>
            <Text style={[appStyles.btnTxt, ,]}>{cancelText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              onOk();
            }}
            style={[appStyles.btn, appStyles.ms2]}>
            <Text style={[appStyles.btnTxt]}>{okText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
