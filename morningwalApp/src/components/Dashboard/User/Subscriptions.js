import React, {useState, useEffect} from 'react';
import {Image, Text, TouchableOpacity, ScrollView, View} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import moment from 'moment';

import {getRefresh} from '../../../redux/refreshSlice';
import {getUser} from '../../../redux/userSlice';
import user from '../../../services/user';

import appStyles from '../../../utils/appStyles';
import appColors from '../../../utils/appColors';
import styles from '../../../utils/styles';
import {showErrorToast} from '../../../utils/appHelpers';

import SpaceBox from '../../Common/SpaceBox';
import Header from '../../Common/Header';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Subscriptions = ({navigation}) => {
  const refresh = useSelector(state => getRefresh(state, 'subscription'));
  const [overlayLoader, setOverlayLoader] = useState(true);
  const [data, setData] = useState([]);

  const loadSubscriptions = () => {
    setOverlayLoader(true);
    user
      .getSubscriptions()
      .then(res => {
        setOverlayLoader(false);
        if (res?.status) {
          console.log(res?.data?.data);
          setData(res?.data?.data);
        }
      })
      .catch(function (error) { 
        setOverlayLoader(false);
        showErrorToast(error.message);
      });
  };

  useEffect(() => {
    loadSubscriptions();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Header title="Subscriptions" type='back'/>
      <ScrollView
        style={[styles.dashboardSection, {backgroundColor:appColors.themeColor50}]}
        vertical
        showsHorizontalScrollIndicator={false}>
        <SpaceBox height={5}/>

        <Text style={{color:'#AAAAAA', fontSize:13, fontWeight:'600', marginVertical:10, paddingHorizontal:10}}>
          {data.length} Current Subscriptions
        </Text>
        {/* Subscription group boxes */}
        <View style={[styles.sectionWrapper, {paddingTop:0}]}>
          {
            data?.map((item, index) => (
              <View key={'subscribe-' + index} style={{backgroundColor:'#FFFFFF', borderWidth:1, borderColor:appColors.themeColor300, borderRadius:5, marginVertical:3, paddingHorizontal:5, paddingVertical:5, marginHorizontal:10}}>
                <View style={{flexDirection:'row', marginVertical:5}}>
                  <View style={{justifyContent:'center'}}>
                    <Image source={{uri:item?.product_variant?.featured_image?.image_url}} resizeMode='cover' style={{height:50, width:50}}/>
                  </View>
                  <View style={{flex:5, marginLeft:5}}>
                    <Text style={{color:'#000', fontSize:14, fontWeight:'500'}}>
                      {item?.product_variant?.product?.title}
                    </Text>
                    <Text style={{fontSize:12, color:appColors.dark100, marginVertical:5}}>
                      {item?.product_variant?.quantity}{item?.product_variant?.product?.unit} 
                    </Text>
                    <View style={{flexDirection:'row'}}>
                      <View style={{backgroundColor:appColors.orange, borderColor:appColors.orange, borderWidth:1, borderRadius:10, paddingHorizontal:2, paddingVertical:2, width:55, marginVertical:2}}>
                        <Text style={{color:'#FFF', fontWeight:'600',fontSize:11, textAlign:'center'}}>
                          {item?.subscription?.type}
                        </Text>
                      </View>
                      <View style={{flexDirection:'row', backgroundColor:appColors.green, borderColor:appColors.green, borderWidth:1, borderRadius:10, paddingHorizontal:5, paddingVertical:2, width:70, margin:2, justifyContent:'center'}}>
                        <Icon name="check" size={13} color={appColors.light} />
                        <Text style={{color:'#FFF', fontWeight:'600',fontSize:11, textAlign:'center'}}>
                        {item?.status}
                        </Text>
                      </View>
                      <View style={{flexDirection:'row', backgroundColor:appColors.blue, borderColor:appColors.blue, borderWidth:1, borderRadius:10, paddingHorizontal:5, paddingVertical:2, margin:2, justifyContent:'center'}}>
                        <Text style={{color:'#FFF', fontWeight:'600',fontSize:11, textAlign:'center'}}>
                        Start Date: {moment(item?.start_date).format('DD/MM/YYYY')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{flex:0.7}}>
                    <TouchableOpacity 
                      onPress={() => {
                        navigation.navigate('EditSubscription', {data:item});
                      }}
                      style={{justifyContent:'center', paddingHorizontal:5}}
                      >
                      <Icon name="edit" size={17} color={appColors.themeColor} style={{paddingHorizontal:5}}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          }
        </View>
        
      </ScrollView>
      {/* <Spinner visible={overlayLoader} /> */}
    </View>
  );
};

export default Subscriptions;
