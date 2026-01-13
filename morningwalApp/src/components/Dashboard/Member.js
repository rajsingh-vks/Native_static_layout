import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Alert, AppState, RefreshControl, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import {getRefresh} from '../../redux/refreshSlice';
import {getUser} from '../../redux/userSlice';
import user from '../../services/user';

import {showErrorToast, showLoading} from '../../utils/appHelpers';
import appColors from '../../utils/appColors';
import appStyles from '../../utils/appStyles';
import styles from '../../utils/styles';

import Header from '../Common/Header';
import ProfileImage from '../Common/ProfileImage';
import SpaceBox from '../Common/SpaceBox';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Member = ({navigation, route}) => {
  const refresh = useSelector(state => getRefresh(state, 'membership'));
  const userData = useSelector(getUser);
  const [data, setData] = useState({});
  const [selected, setSelected] = useState(0);
  const [fields, setFields] = useState({
    coupon_code: '',
  });

  // Load Membership list
  const loadMembership = (loading = false) => {console.log(selected);
    loading ? showLoading(true) : null;
    user
      .getMembershipByTitle()
      .then(res => {
        showLoading(false);
        if (res.status) {
          setData(res.data);
          Object.keys(res.data).map((item, index) => {
            if(index == 0){
              setSelected(res.data[item][0]['id']);
            }
          })
        }
      })
      .catch(function (error) {
        showLoading(false);
        Alert.alert('Info', error.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
        ]);
      });
  };

  const buyMembership = (loading = false) => {
    loading ? showLoading(true) : null;
    user
      .buyMembership({param: selected, data:fields})
      .then(res => {
        showLoading(false);
        if (res.status) {
          Alert.alert('Info', 'Membership successful', [
            {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
          ]);
        }
      })
      .catch(function (error) {
        showLoading(false);
        Alert.alert('Info', error.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
        ]);
      });
  }

  useEffect(() => {
    loadMembership(true);
  }, [refresh]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <View style={[styles.container]}>
      <Header title="Membership" type="back"/>
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => loadMembership(false)}
          />
        }
        style={[styles.dashboardSection, {backgroundColor:appColors.themeColor50, paddingHorizontal:20}]}
        vertical
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <SpaceBox height={5}/>

        {/* Membership group boxes */}
        <View style={[styles.sectionWrapper, {paddingTop:5}]}>
          {Object.keys(data).map((item, index) => (
            <View
              key={'membershipGroup-' + index}
              style={styles.membershipGroup}
              >
                <Text style={styles.groupTitle}>{item}</Text>

                {Object.keys(data[item]).map((obj, key) => (
                  <TouchableOpacity 
                    key={'membership-' + key} 
                    style={styles.membershipItem}
                    activeOpacity={1}
                    onPress={() => {
                      setSelected(data[item][obj]['id']);
                    }}
                    >
                    <View style={{paddingHorizontal:10, paddingVertical:10, backgroundColor:'rgba(53, 161, 218, 0.1)', borderColor:'#2388c9', borderWidth:0.5, borderRadius:5}}>
                      {(selected == data[item][obj]['id']) && 
                        <View style={{position:'absolute', top:0, right:0}}>
                          <View style={[styles.triangleCorner]}></View>
                          <View style={styles.star}>
                            <Icon name='star-outline' color='#FFFFFF' size={16}></Icon>
                          </View>
                        </View>
                      }
                      
                      <View style={{flexDirection:'row'}}>
                        <Text style={[styles.itemHeader, {textAlign:'left', paddingLeft:5}]}>Cost</Text>
                        <Text style={[styles.itemHeader, {flex:2}]}>Max Discount</Text>
                        <Text style={styles.itemHeader}>Validity</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={[styles.itemVal, {textAlign:'left', paddingLeft:5}]}>
                          {'\u20B9'}{data[item][obj]['cost']}
                        </Text>
                        <Text style={[styles.itemVal, {flex:2, fontWeight:'400'}]}>
                          {'\u20B9'}{data[item][obj]['max_discount_amount']}
                        </Text>
                        <Text style={[styles.itemVal,{fontWeight:'400'}]}>
                          {data[item][obj]['validity']} days
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[{marginVertical:5, height:50}]}>
        <TouchableOpacity 
          onPress={() => {
            buyMembership(true);
          }}
          style={[styles.btnTrans, styles.iconBtn, {backgroundColor:'#FFFFFF', borderColor:appColors.themeColor, justifyContent:'flex-start', paddingVertical:5, width:180}]}>
          <Icon name="check" size={20} color={appColors.themeColor} />
          <Text style={[styles.btnTransText, {borderWidth:0, fontSize:16, fontWeight:'600', textAlign:'center'}]}>Buy Membership</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Member;
