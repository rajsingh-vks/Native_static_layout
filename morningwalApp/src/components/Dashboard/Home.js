import React, { useState, useEffect } from 'react';
import { Alert, AppState, Button, Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import randomcolor from 'randomcolor';
import Icon from 'react-native-vector-icons/Octicons';

import { getRefresh } from '../../redux/refreshSlice';
import { getUser } from '../../redux/userSlice';
import user from '../../services/user';

import { showErrorToast, showLoading } from '../../utils/appHelpers';
import appColors from '../../utils/appColors';
import appStyles from '../../utils/appStyles';
import styles from '../../utils/styles';

import Header from '../Common/Header';
import ProfileImage from '../Common/ProfileImage';
import SpaceBox from '../Common/SpaceBox';

import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableHighlight } from '@gorhom/bottom-sheet';
// import { SliderBox } from "react-native-image-slider-box";



const Home = ({ navigation, route }) => {
  const refresh = useSelector(state => getRefresh(state, 'home'));

  const userData = useSelector(getUser);
  const bannerImage = [
    require('../../assets/images/banner.jpeg'),
    require('../../assets/images/dairy-2.jpeg'),
    require('../../assets/images/dairy-3.jpeg'),
    require('../../assets/images/dairy.jpeg'),
  ]

  const [banners, setBanners] = useState({});
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  

  // Load dashboard details
  const loadDashboard = async (loading = true) => {
    loading ? showLoading(true) : null;

    user
      .getDashboard()
      .then(res => {
        showLoading(false);
        if (res.status) {
          setBanners(res.data.banners);
          setCategories(res.data.categories);
          setProducts(res.data.product_variants);
        }
      })
      .catch(function (error) {
        showLoading(false);
        Alert.alert('Info', error.message, [
          { text: 'OK', onPress: () => console.log('OK Pressed'), style: 'default', isPreferred: true },
        ]);
      });
  };

  useEffect(() => {
    loadDashboard();
  }, [refresh]);


  return (
    <View style={[styles.container]}>
      <Header title="Morning Delivery" subTitle="5am to 7:30am" type='logo' style={{}}/>
      <View style={[styles.informBox, { flex:0, }]}>
        <Text style={[styles.informBoxText, { paddingTop: 0, fontWeight: '500'}]}>
          For 7:00AM delivery please order by 11:59PM
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => loadDashboard()}
          />
        }
        style={[styles.dashboardSection]}
        vertical
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        {/* Banner Slider */}
        <View style={styles.vipPageBanner}>
          {/* <Image source={require('../../assets/images/banner.jpeg')} style={styles.vipPageBannerImage}/> */}
          <Image source={{uri:banners[1]?.image_url}} style={styles.vipPageBannerImage} resizeMode='cover'/>
        </View>

        {/* Banner */}

        {/* Main content */}
        <View style={[styles.cardBox]}>

          
          <SpaceBox height={15} />

          {/* By Category */}
            <View style={styles.popularProductContainer}>
              <Text style={styles.popularProductTitle}>What do you looking for? </Text>
              <TouchableOpacity
                  onPress={() => {navigation.navigate('Products');}}>
                    <View style={[styles.headerIcon2, {alignItems:'center', flexDirection:'row'}]}>
                      <Text style={{color:'#2388c9', fontSize:16, fontWeight:'500'}}>View all</Text>
                      <Icon2 name="arrow-right-thin" color="#2388c9" size={20} />
                    </View>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.productBoxAlign}>
              {
                categories?.map((item, index) => (
                  <View key={'category-' + index} style={styles.productBox}>
                    <TouchableOpacity>
                      <Image
                        style={styles.productBoxImage}
                        resizeMode='contain'
                        source={{uri:item?.image_url}} />
                      <LinearGradient
                        colors={['#FBDD04', '#fff', '#FBDD04']}
                        style={[styles.productItemContainerItem, { borderTopEndRadius: 0, borderTopRightRadius: 0 }]}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                        <Text style={styles.saving}>{item?.title}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                ))
              }
            </View> */}

            <View style={styles.categoryListing}>
              {
                categories?.map((item, index) => (
                  <View key={'category-' + index} style={styles.categoryListingItem}>
                    <TouchableOpacity>
                      <Image
                        style={styles.categoryImage}
                        resizeMode='contain'
                        source={{uri:item?.image_url}} />
                      <View>
                        <Text style={styles.categoryTitle}>{item?.title}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              }
            </View>
          {/* By Category */}

          <SpaceBox height={15} />
          {/* Popular Products */}
            <View style={styles.popularProductContainer}>
              <Text style={styles.popularProductTitle}>Popular Product</Text>
              <TouchableOpacity
                  onPress={() => {navigation.navigate('Products');}}>
                    <View style={[styles.headerIcon2, {alignItems:'center', flexDirection:'row'}]}>
                      <Text style={{color:'#2388c9', fontSize:16, fontWeight:'500'}}>View all</Text>
                      <Icon2 name="arrow-right-thin" color="#2388c9" size={20} />
                    </View>
              </TouchableOpacity>
            </View>

            <View style={styles.productBoxAlign}>
              {
                products?.map((item, index) => (
                  <View key={'product-' + index} style={styles.productBox}>
                    <LinearGradient
                      colors={['#FBDD04', '#E5FB04', '#B8FB04']}
                      style={[styles.linearGradient, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                      <Text style={[styles.buttonText, {fontSize:12, fontWeight:'500'}]}>
                        Harmone Free
                      </Text>
                    </LinearGradient>
                    <TouchableOpacity style={[styles.productDetails, { flexDirection: 'column' }]}>
                      <SpaceBox height={15} />
                      
                      <View style={styles.itemLogo}>
                        <View style={[styles.offPercnt]}>
                          <Text style={{textAlign:'center',fontWeight:'700', fontSize:12}}>
                            45% off
                          </Text>
                        </View>
                        <Image
                          style={styles.itemImage}
                          source={{ uri: item?.featured_image?.image_url }}
                        />
                      </View>
                      <SpaceBox height={20} />
                      <View style={[styles.itemBody]}>
                        <Text style={[styles.itemName, {fontSize:15}]}>{item?.product?.title}</Text>
                      </View>
                      <View style={[styles.itemBody]}>
                        <SpaceBox height={5} />
                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.quantityTitle}>{item?.quantity}{item?.product?.unit}</Text>
                          <Text style={[styles.quantityTitle, {marginLeft:'auto', textDecorationLine:'line-through',}]}>
                            {'\u20B9'}{item?.mrp}
                          </Text>
                        </View>
                      </View>

                      <SpaceBox height={10} />
                      <View style={[styles.popularProductContainer, {marginHorizontal:10}]}>
                        <Text style={[styles.popularProductTitle, {fontSize:14, fontWeight:'600'}]}>{'\u20B9'}{item?.price}</Text>
                        <TouchableOpacity style={[styles.addItem]}>
                          <Text style={[styles.addItemText, { width: 60, textAlign: 'center' }]}>
                            + ADD
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                    
                    <SpaceBox height={10} />
                    <View style={[styles.productBoxFooter]}>
                      <LinearGradient
                        colors={['#FBDD04','#fff', '#FBDD04']}
                        style={[styles.productItemContainerItem, styles.mwGoldButton]}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                        <Text style={[styles.saving, {fontSize:13, marginRight:'auto'}]}>
                          Saving {'\u20B9'}24
                        </Text>
                        <TouchableHighlight style={[styles.memberShipButton]}>
                          <Icon style={styles.memberShipButtonIcon} name="arrow-right" />
                        </TouchableHighlight>
                      </LinearGradient>
                    </View>
                  </View>
                ))
              }
            </View>
          {/* Popular Products */}

        </View>
        {/* Main content */}
      </ScrollView>
      {/* {__DEV__ && <CheckForUpdate />} */}
      {/* <CheckForUpdate /> */}
      {/* <ClockinDetailsModal /> */}
    </View>
  );
};

export default Home;
