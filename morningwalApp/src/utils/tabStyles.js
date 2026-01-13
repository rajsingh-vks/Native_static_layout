import {StyleSheet} from 'react-native';

const tabStyles = StyleSheet.create({
  container: {
    overflow: 'visible',
    marginTop: 50,
    backgroundColor: 'transparent',
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabBar: {
    backgroundColor: '#DDF7FF',
    borderRadius: 30,
    overflow: 'hidden',
    maxHeight: 30,
    elevation: 0,
    marginHorizontal: 18,
  },
  tabItem: {
    marginTop: -19,
  },
  tabLabel: {
    fontSize: 13,
  },
  activeTab: {},
});

export default tabStyles;
