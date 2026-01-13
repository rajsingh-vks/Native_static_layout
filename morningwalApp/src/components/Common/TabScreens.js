import * as React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import appColors from '../../utils/appColors';
import tabStyles from '../../utils/tabStyles';
import appStyles from '../../utils/appStyles';

// This is our placeholder component for the tabs
// This will be rendered when a tab isn't loaded yet
// You could also customize it to render different content depending on the route
const LazyPlaceholder = ({route}) => (
  <View style={tabStyles.scene}>
    <Text>Loading {route.title}…</Text>
  </View>
);

export default class TabScreens extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleIndexChange = index => this.setState({index});

  _renderLazyPlaceholder = ({route}) => <LazyPlaceholder route={route} />;

  render() {
    let scenes = {};
    this.props.routes.forEach((item, index) => {
      scenes = {...scenes, [index]: item.component};
    });
    const tabRoutes = this.props.routes.map((item, index) => {
      return {key: index, title: item.title};
    });
    return (
      <TabView
        // lazy
        navigationState={{
          index: 0,
          routes: tabRoutes,
        }}
        renderScene={SceneMap(scenes)}
        renderLazyPlaceholder={this._renderLazyPlaceholder}
        onIndexChange={this._handleIndexChange}
        initialLayout={{width: Dimensions.get('window').width}}
        style={tabStyles.container}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={[tabStyles.tabBar]}
            renderLabel={({route, focused}) => (
              <View style={[tabStyles.tabItem]}>
                <Text
                  style={[
                    {color: focused ? appColors.dark300 : appColors.dark600 },
                    tabStyles.tabLabel,
                    appStyles.ff_Roboto_Medium,
                    focused ? tabStyles.activeTab : null,
                  ]}>
                  {route.title}
                </Text>
              </View>
            )}
            indicatorStyle={{
              backgroundColor: appColors.themeColor200,
              height: '100%',
              borderRadius: 30,
            }}
          />
        )}
      />
    );
  }
}
