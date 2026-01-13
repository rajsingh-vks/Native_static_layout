import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {spinnerVisible} from '../../redux/appSlice';
import {useSelector} from 'react-redux';
import appColors from '../../utils/appColors';
const OverlayLoading = () => {
  const visible = useSelector(spinnerVisible);
  
  return (
    visible && (
      <Spinner
        visible={visible}
        color={appColors.themeColor}
        size={60}
        overlayColor="rgba(0, 0, 0, 0.1)"
      />
    )
  );
};
export default OverlayLoading;
