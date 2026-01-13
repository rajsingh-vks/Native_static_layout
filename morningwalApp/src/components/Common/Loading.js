import {Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import appStyles from '../../utils/appStyles';
import appColors from '../../utils/appColors';

const Loading = ({
  text = '',
  height = 100,
  width = '100%',
  size = 40,
  style,
}) => {
  return (
    <View style={[appStyles.flexCenter, {maxHeight: height, width}, style]}>
      <View style={[appStyles.row, appStyles.alignItemsCenter]}>
        <ActivityIndicator color={appColors.themeColor} size={size} />
        {text && (
          <Text style={[appStyles.ms1, {color: appColors.dark400}]}>
            {text}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Loading;
