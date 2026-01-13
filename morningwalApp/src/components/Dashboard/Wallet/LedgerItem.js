import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../../../utils/styles';
import moment from 'moment';
import ProfileImage from '../../Common/ProfileImage';
import {getImageURL} from '../../../utils/appHelpers';

import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import appColors from '../../../utils/appColors';
import env from '../../../utils/env';
import appStyles from '../../../utils/appStyles';

const LedgerItem = ({data, navigation, profileImage = false, team=false}) => {
  return (
    <TouchableOpacity
    activeOpacity={0.7}
      style={[styles.itemContainer, appStyles.mx2, {/*borderWidth:1*/}]}
      onPress={() => {/*navigation.navigate('ItemDetails', {data,team})*/}}>

      <View style={[styles.itemColFirst]}>
        {data?.type == 'credit' && 
          <View>
            <Icon name="circle" size={35} color={appColors.green} />
            <Text style={styles.iconText}>C</Text>
          </View>
        }
        {data?.type == 'debit' && 
          <View>
            <Icon name="circle" size={35} color={appColors.red} />
            <Text style={styles.iconText}>D</Text>
          </View>
        }
        {(data?.type == 'cashback' || data?.type == 'voucher') && 
          <View>
            <Icon name="circle" size={35} color={appColors.themeColor} />
            <Text style={styles.iconText}>C</Text>
          </View>
        }
      </View>

      <View style={styles.itemColSec}>
        <Text style={styles.transMemo}>{data?.memo}</Text>
        <Text style={styles.transTime}>
          {moment(data?.created_at).format('MMMM DD, YYYY')} at {moment(data?.created_at).format('h:mm:ss A')}
        </Text>
      </View>

      <View style={styles.itemColThird}>
        {data?.type == 'credit' &&
          <Text style={styles.amountText}>
            +{'\u20B9'}{data.amount}
            <Icon name="arrow-bottom-left" size={15} color='green'/>
          </Text>
        }
        {data?.type == 'debit' &&
          <Text style={styles.amountText}>
            -{'\u20B9'}{data.amount}
            <Icon name="arrow-top-right" size={15} color='red'/>
          </Text>
        }
      </View>
    </TouchableOpacity>
  );
};

export default LedgerItem;
