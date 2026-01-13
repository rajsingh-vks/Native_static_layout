import React, {useState, useEffect} from 'react';
import {Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View} from 'react-native';

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

import Header from '../../Common/Header';
import SpaceBox from '../../Common/SpaceBox';

import Icon from 'react-native-vector-icons/MaterialIcons';


const Address = ({navigation}) => {
  const refresh = useSelector(state => getRefresh(state, 'address'));

  const [overlayLoader, setOverlayLoader] = useState(true);
  const [data, setData] = useState([]);

  const loadAddress = (loader) => {console.log(data);
    setOverlayLoader(loader);

    user
      .getAddresses()
      .then(res => {
        setOverlayLoader(false);

        if (res?.status) {
          setData(res.data);
        }
      })
      .catch(function (error) {
        setOverlayLoader(false);

        Alert.alert('Info', error.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true},
        ]);
      });
  };

  const addAddress = () => {
    navigation.navigate('EditAddress', {data:[]});
  };

  useEffect(() => {
    loadAddress(true);
  }, [refresh]);

  return (
    <View style={[styles.container]}>
      <Header title="Address" type='back'/>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => loadAddress(false)}
          />
        }
        style={[styles.dashboardSection, {backgroundColor:appColors.themeColor50}]}
        vertical
        showsHorizontalScrollIndicator={false}>
        <SpaceBox height={10}/>

        <Text style={{color:'#AAAAAA', fontSize:13, fontWeight:'600', marginTop:10, paddingHorizontal:20}}>
          {data.length} SAVED ADDRESS
        </Text>
        {/* Address group boxes */}
        <View style={[styles.sectionWrapper, {paddingTop:0}]}>
          {
            data?.map((item, index) => (
              <View key={'address-' + index} style={{backgroundColor:'#FFFFFF', borderWidth:1, borderColor:'#DDDDDD', borderRadius:5, marginVertical:5, paddingHorizontal:20, paddingVertical:10}}>
                <View style={{flexDirection:'row', marginVertical:10}}>
                  <Text style={{fontSize:18}}>{item?.name}</Text>
                  <Text style={{fontSize:15, backgroundColor:'#EEEEEE', marginHorizontal:5, paddingVertical:3, paddingHorizontal:8}}>
                    {item?.address_type}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => {
                      navigation.navigate('EditAddress', {data:item});
                    }}
                    style={{justifyContent:'center', paddingHorizontal:10, paddingVertical:5, position:'absolute', right:0}}
                    >
                    <Icon name="edit" size={18} color={appColors.themeColor} />
                  </TouchableOpacity>
                </View>
                
                <Text>{item?.locality}, {item?.landmark}, {item?.area}, {item?.city}</Text>
                <Text>{item?.state['name']}-{item?.pin_code}</Text>

                <View style={{flexDirection:'row', marginVertical:10}}>
                  <Text>{item.mobile}</Text>
                  {item?.alternate_phone && 
                    <Text>, {item.alternate_phone}</Text>
                  }
                </View>
              </View>
            ))
          }
        </View>

        <View style={[styles.continueButtonWrapper, {marginVertical:20}]}>
          <TouchableOpacity 
            onPress={() => addAddress()}
            style={[styles.btnTrans, styles.iconBtn, {backgroundColor:'#FFFFFF', borderColor:appColors.themeColor, justifyContent:'flex-start', paddingVertical:5, width:170}]}>
            <Icon name="add" size={20} color={appColors.themeColor} />
            <Text style={[styles.btnTransText, {borderWidth:0, fontSize:14, fontWeight:'600', textAlign:'center'}]}>
              Add New Address
            </Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>

      <Spinner visible={overlayLoader} color={appColors.themeColor} size={60} overlayColor="rgba(0, 0, 0, 0.1)"/>
    </View>
  );
};

export default Address;
