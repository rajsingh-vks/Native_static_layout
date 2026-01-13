import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Alert, AppState, FlatList, RefreshControl, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, View} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import moment from 'moment';

import {getRefresh} from '../../redux/refreshSlice';
import {getUser} from '../../redux/userSlice';
import user from '../../services/user';

import appStyles from '../../utils/appStyles';
import appColors from '../../utils/appColors';
import styles from '../../utils/styles';
import {refresh, showErrorToast, showSuccessToast, showLoading} from '../../utils/appHelpers';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import LedgerItem from './Wallet/LedgerItem';
import Header from '../Common/Header';
import SpaceBox from '../Common/SpaceBox';

const Wallet = ({navigation, route}) => {
  const refresh = useSelector(state => getRefresh(state, 'wallet'));
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [data, setData] = useState({});
  const userData = useSelector(getUser);

  const [loadMore, setLoadMore] = useState({
    loading: false,
    pageNo: 1,
    nextData: true,
  });
  const handleLoadMore = values => {
    setLoadMore({...loadMore, ...values});
  };
  
  /* Load Wallet transactions */
  const getWalletData = (loading = true) => {console.log(userData);
    loading ? showLoading(true) : null;

    user
      .getTransactions()
      .then(res => {
        showLoading(false);
        if (res?.status) {
          setData(res?.data?.data);
        }
      })
      .catch(function (error) {
        showLoading(false);
        showErrorToast(error.message);
      });
  };

  const loadMoreData = () => {
    // if (data?.length > 0 && loadMore.nextData && !loadMore.loading) {
    //   const pageNo = ++loadMore.pageNo;
    //   handleLoadMore({loading: true, pageNo: pageNo});
    //   user
    //     .expenseList({page: pageNo})
    //     .then(res => {
    //       handleLoadMore({loading: false});
    //       if (res?.success) {
    //         if (
    //           Array.isArray(res?.expenseList) &&
    //           res?.expenseList.length > 0
    //         ) {
    //           setData([...data, ...res?.expenseList]);
    //         } else {
    //           handleLoadMore({nextData: false});
    //         }
    //       }
    //     })
    //     .catch(function (error) {
    //       handleLoadMore({loading: false});
    //       showErrorToast(error.message);
    //     });
    // }
  };

  useEffect(() => {
    getWalletData();
  }, [refresh]);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       getWalletData();
  //       console.log('Wallet is loading...');
  //     }
  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //   });
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  return (
    <View style={[styles.container]}>
      <Header title="Wallet" type="back" 
        rightIconComponent={
          <>
            <Text style={{fontWeight:'500'}}>Balance</Text>
            <Text style={{fontWeight:'700'}}>{'\u20B9'} {userData?.wallet_amount}</Text>
          </>
        }
      />

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => getWalletData()}
          />
        }
        data={data}
        renderItem={({item}) => (
          <LedgerItem data={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index}
        onEndReached={() => loadMoreData()}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loadMore.loading ? (
            <Loading style={{height: 80}} text="Loading..." />
          ) : (
            <SpaceBox height={80} />
          )
        }
      />
      {/* <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => getWalletData()}
          />
        }
        style={[styles.dashboardSection]}
        vertical
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <SpaceBox height={30} />
        <View style={styles.sectionWrapper}>
          
        </View>
      </ScrollView> */}
    </View>
  );
};

export default Wallet;
