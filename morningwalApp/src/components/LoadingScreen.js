import {View, Image, ImageBackground, ActivityIndicator} from 'react-native';
import styles from '../utils/styles';

const LoadingScreen = () => {
  return (
    <>
      <ImageBackground
        source={require('../assets/images/splashScreen.jpg')}
        style={{height: '100%'}}>
        <View>
          <View style={styles.logowrapper}>
            <Image
            resizeMode='contain'
              style={styles.logo}
              source={require('../assets/images/SignalHRM-logo.png')}
            />
          </View>
          <ActivityIndicator size="large" color="black" />
        </View>
      </ImageBackground>
    </>
  );
};

export default LoadingScreen;
