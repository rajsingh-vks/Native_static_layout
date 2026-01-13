import {
    View,
    SafeAreaView,
    Image,
    ImageBackground,
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import styles from '../utils/styles';

const Signup = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.topContainer}>
                    <ImageBackground
                        source={require('../assets/images/login_bakground.png')}
                        style={styles.backgroundContainer}>
                        <View style={styles.authWrapper}>
                            <View style={styles.authTitleWrapper}>
                                <Text style={styles.authTitle}>Register</Text>
                            </View>
                            <View style={[styles.inputwrapper,{marginBottom:10}]}>
                                <TextInput
                                    placeholder="Name"
                                    placeholderTextColor="#CDCDCD"
                                    style={styles.inputArea}
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={[styles.inputwrapper,{marginBottom:10}]}>
                                <TextInput
                                    placeholder="Email / Username"
                                    placeholderTextColor="#CDCDCD"
                                    style={styles.inputArea}
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={[styles.inputwrapper,{marginBottom:10}]}>
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor="#CDCDCD"
                                    secureTextEntry={true}
                                    style={styles.inputArea}
                                />
                            </View>
                            <View style={[styles.inputwrapper,{marginBottom:10}]}>
                                <TouchableOpacity style={styles.submitButton}>
                                    <Text style={styles.submitButtonText}>Create</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{ alignItems: 'center' }}>
                                <Text style={[styles.whiteText, styles.underline]}>I agree with Terms & Conditions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center' }}
                                onPress={() => navigation.navigate('Login')}>
                                <Text style={[styles.whiteText, styles.authredirectionText, styles.signupauthredirectionText]}>Already have an account</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.logowrapper}>
                        <Image
                            style={styles.logo}
                            source={require('../assets/images/SignalHRM-logo.png')}></Image>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default Signup;
