import React from 'react';
import styles from '../utils/styles';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerLayout from './DrawerLayout';
// import Profile from '../components/Dashboard/Profile';
import TabNavigation from './TabNavigation';
import Icon from 'react-native-vector-icons/Feather';
import Icon6 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon7 from 'react-native-vector-icons/MaterialIcons';
import appColors from '../utils/appColors';
import appStyles from '../utils/appStyles';
// import Policies from '../components/Policies';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      // useLegacyImplementation={false}
      drawerContent={props => <DrawerLayout {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: appColors.themeColor,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: [
          {
            fontSize: 16,
          },
          appStyles.ff__Roboto_Medium,
        ],
      }}
      initialRouteName="Dashboard">
      <Drawer.Screen
        name="Dashboard"
        component={TabNavigation}
        options={{
          drawerIcon: ({size, color}) => (
            <Icon
              size={size}
              color={color}
              name="pie-chart"
              style={[styles.drawerIcon]}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon
              size={size}
              color={color}
              name="user"
              style={[styles.drawerIcon]}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
