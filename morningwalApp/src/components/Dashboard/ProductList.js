import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import styles from '../../utils/styles';
import SpaceBox from '../Common/SpaceBox';

import Header from '../Common/Header';
import LinearGradient from 'react-native-linear-gradient';
import CartButton from '../Common/CartButton';



const ProductList = ({ }) => {
 
  return (
    <View style={[styles.container]}>
      <Header title="Morning Delivery" subTitle="Deliver at 5am to 7:30am" type='productDetails' />
      
      <ScrollView>
         <View style={styles.detailsImage}>
            <Image
              style={styles.detailsImagestretch}
              source={require('../../assets/images/dairy.jpeg')}
            />
         </View>
         <View style={styles.detailsContent}>
            
            <CartButton />
            <Text>Demo</Text>
            
            <View style={styles.detailsContentView}>
              <View style={[styles.itemBody, styles.detailsContentTopViewAlign]}>
                <View style={[styles.itemBody, {flex: 3}]}>
                  <Text style={styles.itemName}>Cow Milk</Text>
                  <Text style={styles.quantityTitle}>450 ml</Text>
                </View>
                <View style={[styles.itemBody, {flex: 1}]}>
                  <LinearGradient colors={['#FBDD04', '#E5FB04', '#B8FB04']} style={styles.linearGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.buttonText}>
                       Hormone Free
                    </Text>
                  </LinearGradient>
                </View>
              </View>

              <SpaceBox height={20} />

              <View style={[styles.itemBody, styles.detailsContentTopViewAlign]}>
                <View style={[styles.itemBody, {flex: 3}]}>
                  <Text style={styles.price}>$ 35</Text>
                </View>
                <View style={[styles.itemStatus, {flex: 1}]}>
                    <TouchableOpacity style={styles.addItem}>
                      <Text style={styles.addItemText}>
                        ADD
                      </Text>
                    </TouchableOpacity>
                </View>
              </View>

              <SpaceBox height={20} />

              <LinearGradient 
                colors={['#fff', '#FBDD04']} 
                style={[ styles.productItemContainerItem ]} 
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Text style={[ styles.saving ]}>You are Saving $ 24 (45% OFF) with VIP</Text>
              </LinearGradient>
              <SpaceBox height={10} />
              <View style={[ styles.productItemContainerItem, styles.productOffer ]}>
                <Text style={[ styles.productOfferText ]}>Offer applicable on max 9 units</Text>
              </View>
            </View>

            <View style={{ height: 2, backgroundColor: '#f1f1f1' }}></View>

            <View style={styles.detailsContentView}>
              <View style={[styles.itemBody, styles.detailsContentTopViewAlign]}>
                <View style={styles.itemBody}>
                  <Text style={styles.itemName}>Subscription Type</Text>
                  <Text style={styles.quantityTitle}>450 ml</Text>
                </View>
                <View style={styles.itemBody}>
                  <Text style={styles.itemName}>Start Date</Text>
                  <Text style={styles.quantityTitle}>450 ml</Text>
                </View>
              </View>
              
            </View>
            <View style={{ height: 2, backgroundColor: '#f1f1f1' }}></View>

            <View>
              <SpaceBox height={20} />
              <View style={[styles.itemBody, styles.detailsContentTopViewAlign]}>
                <View style={[styles.placeOrderBox]}>
                   <Text style={styles.placeOrderPrice}>$ 35</Text>
                   <TouchableOpacity>
                      <Text style={styles.placeOrder}>Place Order</Text>
                    </TouchableOpacity>
                </View>
              </View>
              <SpaceBox height={20} />
            </View>

         </View>
      </ScrollView>
    </View>
  );
};

export default ProductList;
