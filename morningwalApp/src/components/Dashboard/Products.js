import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Image, RefreshControl, ScrollView, Text, View, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Octicons';

import { getRefresh } from '../../redux/refreshSlice';

import styles from '../../utils/styles';

import Header from '../Common/Header';
import SpaceBox from '../Common/SpaceBox';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
// import Modal from "react-native-modal";
import { TouchableHighlight } from '@gorhom/bottom-sheet';
import Colors from '../../utils/Colors';


const listTab = [
  {
    status: 'all',
    title: 'All Categories',
    image: 'https://cdn1.iconfinder.com/data/icons/basic-ui-169/32/Categories-1024.png'
  },
  {
    status: 'milk',
    title: 'Milk Product',
    image: 'https://cdn0.iconfinder.com/data/icons/animal-kingdom-vol-1/512/cow_farm_animal_milk-1024.png'
  },
  {
    status: 'vegetables',
    title: ' Vegetables',
    image: 'https://cdn3.iconfinder.com/data/icons/food-set-2-1/91/Food_C136-1024.png'
  },
  {
    status: 'bread',
    title: 'Breads & Nuts',
    image: 'https://cdn2.iconfinder.com/data/icons/breakfast-flaticon/64/CROISSANT-coffee_mug-kitchenware-breads-coffee-512.png'
  },
  {
    status: 'seeds',
    title: 'Healthy Seeds',
    image: 'https://cdn3.iconfinder.com/data/icons/coffee-shop-148/64/sack-coffee-beans-bag-seeds-512.png'
  }
]

const productData = [
  {
    name: 'Amul Milk',
    image: 'https://m.media-amazon.com/images/I/812816L+HkL._SX679_.jpg',
    quantity: '500 ml',
    price: '25',
    budge: 'Hormone Free',
    status: 'milk'
  },
  {
    name: 'Fresho Green Peas ',
    image: 'https://www.bigbasket.com/media/uploads/p/l/10000284_11-fresho-green-peas.jpg?tr=w-1080,q=80',
    quantity: '1 kg',
    price: '87.6',
    budge: 'Hormone Free',
    status: 'vegetables'
  },
  {
    name: 'Fresho Brown Bread',
    image: 'https://www.bigbasket.com/media/uploads/p/l/70001172_10-english-oven-bread-sandwich.jpg?tr=w-1080,q=80',
    quantity: '400 g',
    price: '57',
    budge: 'Hormone Free',
    status: 'bread'
  },
  {
    name: 'BB Royal Pumpkin',
    image: 'https://www.bigbasket.com/media/uploads/p/l/40168542_11-bb-royal-organic-pumpkin-seeds.jpg?tr=w-1080,q=80',
    quantity: '200 g',
    price: '162',
    budge: 'Hormone Free',
    status: 'seeds'
  }
]



const Products = ({ navigation }) => {
  const refresh = useSelector(state => getRefresh(state, 'products'));
  const [status, setStatus] = useState('All');
  const [dataList, setDataList] = useState(productData)

  const [openModal, setOpenModal] = useState(false)

  // Modal
  function renderModal() {
     return (
       <Modal visible={openModal} animationType='slide' transparent={true}>
         <View style={styles.modalBox}>
          <View style={styles.modalContent}>
              <Button onPress={() => setOpenModal(false)} title='Close' />
              <SpaceBox height={25} />
              <Text style={styles.modalContentTitle}>
                  VIP Membership
              </Text>

              <SpaceBox height={15} />
             
              <Text style={styles.modalContentPara}>
                  Get flat 40% off on all Products.
              </Text>

              <SpaceBox height={15} />
              <Button style={styles.modalButton} color={'#FCD200'} title='Buy Membership' />
          </View>
         </View>
       </Modal>
     )
  }
  // Modal
  
  // Load dashboard details
  const loadDashboard = (loading = true) => {
    return true;
  };

  useEffect(() => {
    loadDashboard();
  }, [refresh]);


  const setStatusFilter = status => {
    if (status !== 'all') {
      setDataList([...productData.filter(e => e.status === status)])
    } else {
      setDataList(productData)
    }
    setStatus(status)
  }

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.productItemContainer}>
        <TouchableOpacity style={styles.productDetails} onPress={() => navigation.navigate('ProductList')}>
          <View style={styles.itemLogo}>
            <Text style={styles.offOnItem}>45% off</Text>
            <Image
              style={styles.itemImage}
              source={{ uri: item.image }}
            />
          </View>
          <View style={styles.itemBody}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.quantityTitle}>{item.quantity}</Text>
            <SpaceBox height={15} />
            <Text style={styles.price}>$ {item.price}</Text>
          </View>

          <View
            style={[styles.itemStatus]}>
              <LinearGradient colors={['#FBDD04', '#E5FB04', '#B8FB04']} style={styles.linearGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Text style={styles.buttonText}>
                  {item.budge}
                </Text>
              </LinearGradient>
              <SpaceBox height={25} />
              <TouchableOpacity style={[styles.addItem, styles.addItemSubcribe]}>
                <Text style={[styles.addItemText, styles.addItemSubcribeText]}>
                  SUBSCRIBE
                </Text>
              </TouchableOpacity>
              <SpaceBox height={5} />
              <TouchableOpacity style={styles.addItem}>
                <Text style={styles.addItemText}>
                  {/* <Ionicons style={styles.addItemIcon} name='add-outline' size={12} /> */}
                  ADD
                </Text>
              </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <SpaceBox height={15} />
        <LinearGradient 
          colors={['#fff', '#FBDD04']} 
          style={[ styles.productItemContainerItem ]} 
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={styles.saving} >You are Saving $ 24 (45% OFF) with VIP  
            <TouchableHighlight style={styles.memberShipButton} onPress={() => setOpenModal(true)}>
                <Icon style={styles.memberShipButtonIcon} name="arrow-right" />
            </TouchableHighlight>
          </Text>
        </LinearGradient>
        <SpaceBox height={10} />
        <View style={[ styles.productItemContainerItem, styles.productOffer ]}>
          <Text style={[ styles.productOfferText ]}>Offer applicable on max 9 units</Text>
        </View>
        {renderModal()}
      </View>
    )
  }

  const separator = () => {
    return (
      <View style={{ height: 1, backgroundColor: '#f1f1f1' }}></View>
    )
  }

  return (
    <View style={[styles.container]}>
      <Header title="Morning Delivery" subTitle="Deliver at 5am to 7:30am" type='productList' />
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
        <View style={[styles.sectionWrapper]}>
          <ScrollView style={styles.listTab}
            showsHorizontalScrollIndicator={false}
            horizontal>
            {
              listTab.map(e => (
                <TouchableOpacity
                  style={[styles.btnTab, status === e.status && styles.btnTabActive]}
                  onPress={() => setStatusFilter(e.status)}>
                    <Image
                      style={styles.tabIcon}
                      source={{ uri: e.image }}
                    />
                  <Text style={[styles.textTab, status === e.status && styles.textTabActive]}>
                    {e.title}</Text>
                </TouchableOpacity>
              ))
            }
          </ScrollView>

          <FlatList
            data={dataList}
            keyExtractor={(e, i) => i.toString}
            renderItem={renderItem}
            ItemSeparatorComponent={separator}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Products;
