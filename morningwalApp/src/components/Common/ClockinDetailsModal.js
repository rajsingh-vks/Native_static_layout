import React from 'react';
import {View} from 'react-native';
import appColors from '../../utils/appColors';
import Modal from 'react-native-modal';

const ClockinDetailsModal = () => {
  return (
    <Modal
      animationIn="slideUp"
      animationOut="slideDown"
      isVisible={true}
      swipeDirection={''}
      onBackdropPress={() => null}
      style={{
        padding:0,
        margin:0,
        flexDirection:'column',
        justifyContent:'flex-end',        
      }}
      >
      <View
        style={{
          alignSelf: 'center',
          overflow: 'hidden',
          borderRadius: 15,
          width: '100%',
          height:200,
          backgroundColor:'white'
        }}>

        </View>
    </Modal>
  );
};

export default ClockinDetailsModal;
