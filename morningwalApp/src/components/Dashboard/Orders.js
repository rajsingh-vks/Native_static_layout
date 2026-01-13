import React, {useState, useEffect, useCallback, useRef} from 'react';
import {AppState, Image, RefreshControl, ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import randomcolor from 'randomcolor';

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

import ClockIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Orders = ({navigation, route}) => {
  const refresh = useSelector(state => getRefresh(state, 'orders'));
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [data, setData] = useState({});
  const userData = useSelector(getUser);
  // Load dashboard details
  const loadDashboard = (loading = true) => {
    return true;
    loading ? showLoading(true) : null;
    user
      .getDashboardData()
      .then(res => {
        showLoading(false);
        if (res.success) {
          setData(res.records);
        }
      })
      .catch(function (error) {
        showLoading(false);
        showErrorToast(error.message);
      });
  };

  useEffect(() => {
    loadDashboard();
  }, [refresh]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        loadDashboard();
        console.log('Dashboard is loading...');
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={[styles.container]}>
      <Header title="My Orders" type="back"/>
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
        <SpaceBox height={30} />
        <View style={styles.sectionWrapper}>
          {/* <UserClock data={data} userData={userData} /> */}
          {/* <View style={[appStyles.row, appStyles.my4]}>
            <View style={appStyles.flexCenter}>
              <ClockIcon
                name="clock-time-ten-outline"
                size={25}
                color={appColors.dark300}
              />
              <Text style={[styles.textPrimary, {padding: 4}]}>
                {data?.first_clock ? data.first_clock : '00:00'}
              </Text>
              <Text style={[styles.textPrimary]}>Check In</Text>
            </View>
            <View style={appStyles.flexCenter}>
              <ClockIcon
                name="clock-outline"
                size={25}
                color={appColors.dark300}
              />
              <Text style={[styles.textPrimary, {padding: 4}]}>
                {data?.last_clock ? data.last_clock : '00:00'}
              </Text>
              <Text style={[styles.textPrimary]}>Check Out</Text>
            </View>
            <View style={appStyles.flexCenter}>
              <ClockIcon
                name="clock-check-outline"
                size={25}
                color={appColors.dark300}
              />
              <Text style={[styles.textPrimary, {padding: 4}]}>
                {data?.total_work_time || '00:00'}
              </Text>
              <Text style={[styles.textPrimary]}>Working Hrs</Text>
            </View>
          </View>
          <View style={styles.calenderChart}>
            <View style={styles.calenderChartBottom}>
              <LinearGradient
                style={[
                  styles.calenderChartButtonBox,
                  styles.calenderChartButtonBox1,
                ]}
                colors={['rgba(36,128,195, 1)', 'rgba(31,185,235, 1)']}>
                <Text style={styles.calenderChartButtonBoxText}>
                  Present Days
                </Text>
                <Text style={styles.calenderChartButtonBoxTextCount}>
                  {data?.profile_details !== undefined
                    ? data?.profile_details.no_of_present
                    : 0}
                </Text>
              </LinearGradient>
              <LinearGradient
                style={[
                  styles.calenderChartButtonBox,
                  styles.calenderChartButtonBox2,
                ]}
                colors={['rgba(36,128,195, 1)', 'rgba(31,185,235, 1)']}>
                <Text style={styles.calenderChartButtonBoxText}>
                  Absent Days
                </Text>
                <Text style={styles.calenderChartButtonBoxTextCount}>
                  {data?.profile_details
                    ? data?.profile_details.no_of_absent
                    : 0}
                </Text>
              </LinearGradient>
            </View>

            <View style={styles.calenderChartBottom}>
              <LinearGradient
                style={[
                  styles.calenderChartButtonBox,
                  styles.calenderChartButtonBox3,
                ]}
                colors={['rgba(36,128,195, 1)', 'rgba(31,185,235, 1)']}>
                <Text style={styles.calenderChartButtonBoxText}>
                  Total Working Hrs
                </Text>
                <Text style={styles.calenderChartButtonBoxTextCount}>
                  {data?.total_work_time ? data?.total_work_time : 0}
                </Text>
              </LinearGradient>
              <LinearGradient
                style={[
                  styles.calenderChartButtonBox,
                  styles.calenderChartButtonBox4,
                ]}
                colors={['rgba(36,128,195, 1)', 'rgba(31,185,235, 1)']}>
                <Text style={styles.calenderChartButtonBoxText}>
                  Current Shift
                </Text>
                <Text style={styles.calenderChartButtonBoxTextCount}>
                  {data?.last_clock ? data?.last_clock : 0}
                </Text>
              </LinearGradient>
            </View>
          </View>
          <View style={styles.teamEvent}>
            <View style={styles.teamWrapper}>
              <View style={styles.teamEventHeader}>
                <Text
                  style={[
                    {color: appColors.dark400},
                    appStyles.fs3,
                    appStyles.fw500,
                  ]}>
                  My Team
                </Text>
              </View>
              <View style={styles.teamSection}>
                {data?.team_member?.slice(0, 9)?.map((item, index) => {
                  return (
                    <ProfileImage
                      key={index}
                      src={item?.image_full_path}
                      style={{
                        marginLeft: -15,
                        backgroundColor: randomcolor({
                          luminosity: 'random',
                          hue: 'random',
                        }),
                      }}
                      size={50}
                      name={item.name}
                    />
                  );
                })}
              </View>
              {(!data.team_member || data.team_member?.length <= 0) && (
                <View style={styles.eventCard}>
                  <View style={styles.eventCardDetails}>
                    <Text
                      style={[
                        styles.eventCardDetailsTitleParagraph,
                        {textAlign: 'center'},
                      ]}>
                      No data available
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.EventWrapper}>
              <View style={styles.teamEventHeader}>
                <Text
                  style={[
                    {color: appColors.dark400},
                    appStyles.fs3,
                    appStyles.fw500,
                  ]}>
                  Upcoming Holidays
                </Text>
              </View>
              {data.holiday?.map((item, index) => {
                return (
                  <View
                    style={[
                      styles.eventCard,
                      appStyles.justifyContentBetween,
                      appStyles.py3,
                      appStyles.alignItemsCenter,
                    ]}
                    key={index}>
                    <View style={[{flex: 1}]}>
                      <Text
                        style={[
                          appStyles.textPrimary,
                          appStyles.fs4,
                          appStyles.mb1,
                        ]}>
                        {item.event_name}
                      </Text>
                      <Text style={[{color: appColors.dark500}, appStyles.fs2]}>
                        {moment(item.date).format('dddd, DD MMMM, YYYY')}
                      </Text>
                    </View>
                    <Ionicons
                      style={[styles.iconBgCircle]}
                      name="calendar-outline"
                      size={30}
                      color={appColors.themeColor}
                    />
                  </View>
                );
              })}
              {(!data.holiday || data.holiday?.length <= 0) && (
                <View style={styles.eventCard}>
                  <View style={styles.eventCardDetails}>
                    <Text
                      style={[
                        styles.eventCardDetailsTitleParagraph,
                        {textAlign: 'center'},
                      ]}>
                      No data available
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.EventWrapper}>
              <View style={styles.teamEventHeader}>
                <Text
                  style={[
                    {color: appColors.dark400},
                    appStyles.fs3,
                    appStyles.fw500,
                  ]}>
                  Upcoming Celebrations
                </Text>
              </View>

              {data.celebrations?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      styles.eventCard,
                      appStyles.justifyContentBetween,
                      appStyles.py3,
                      appStyles.alignItemsCenter,
                    ]}>
                    <View style={[{flex: 1}]}>
                      <Text
                        style={[
                          appStyles.textPrimary,
                          appStyles.fs4,
                          appStyles.mb1,
                        ]}>
                        {item.name}
                      </Text>
                      <Text style={[{color: appColors.dark500}, appStyles.fs2]}>
                        {item?.type == 'birthday'
                          ? 'Birthday '
                          : item?.type == 'work anniversary'
                          ? 'Work Anniversary '
                          : ''}
                        On - {moment(item.date).format('dddd, DD MMMM, YYYY')}
                      </Text>
                    </View>
                    {item?.type == 'birthday' && (
                      <Ionicons
                        style={[styles.iconBgCircle]}
                        name="gift-outline"
                        size={30}
                        color={appColors.themeColor}
                      />
                    )}
                    {item?.type == 'work anniversary' && (
                      <Ionicons
                        style={[styles.iconBgCircle]}
                        name="gift-outline"
                        size={30}
                        color={appColors.themeColor}
                      />
                    )}
                  </View>
                );
              })}
              {(!data.celebrations || data.celebrations?.length <= 0) && (
                <View style={styles.eventCard}>
                  <View style={styles.eventCardDetails}>
                    <Text
                      style={[
                        styles.eventCardDetailsTitleParagraph,
                        {textAlign: 'center'},
                      ]}>
                      No data available
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View> */}
        </View>
      </ScrollView>
      {/* {__DEV__ && <CheckForUpdate />} */}
      {/* <CheckForUpdate /> */}
      {/* <ClockinDetailsModal /> */}
    </View>
  );
};

export default Orders;
