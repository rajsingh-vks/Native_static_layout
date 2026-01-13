import React, { useEffect, useState } from 'react';
import { StatusBar, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

const defaultProps = {
    cartTextTimeOut: 400,
    cartValueTimeIn: 400,
    width: 100,
}


const CartButton = (props: 
        { cartTextTimeOut?: number, 
            cartValueTimeIn?: number, 
            style?: StyleProp<ViewStyle>, 
            cartText?: string, 
            textColor?: string, 
            onChangeHandler:(count:number)=>void }
    ) => {
    const { cartTextTimeOut, cartValueTimeIn, style, cartText, textColor, onChangeHandler } = props;
    const offset = useSharedValue(1);
    const moveLeftVal = useSharedValue(1);
    const moveRightVal = useSharedValue(1);
    const moveInVal = useSharedValue(0);
    const [cartCount, setCartCount] = useState<number>(0)
    const pressBtnStyle = useAnimatedStyle(() => {
        return {
            opacity: offset.value,
            display: offset.value === 0 ? 'none' : "flex",
            transform: [{
                scale: offset.value
            }]
        };
    })
    const afterPressStyle = useAnimatedStyle(() => {
        return {
            display: offset.value >= 0.1 ? 'none' : "flex",
            transform: [{ scale: offset.value ? withSpring(0) : withSpring(1) }]
        };
    }, [offset]);
    const movingInStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: moveInVal.value }]
        };
    }, [offset]);
    const movingLeftStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: moveLeftVal.value }]
        };
    }, [offset]);
    const movingRightStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: moveRightVal.value }]
        };
    }, [offset]);

    const onBtnPressed = () => {
        setCartCount(1)
        offset.value = withTiming(0, { duration: cartTextTimeOut ?? 400 }, () => {
            moveLeftVal.value = withTiming(-20, { duration: cartValueTimeIn ?? 400 })
            moveRightVal.value = withTiming(20, { duration: cartValueTimeIn ?? 400 })
            moveInVal.value = 1
        })
    }
    const handleCount = (value: number) => {
        setCartCount(currentCartCount => currentCartCount + value)
    }
    useEffect(() => {
        if (cartCount === 0) {
            offset.value = withTiming(1, { duration: cartTextTimeOut ?? 400 })
            moveLeftVal.value = withTiming(0, { duration: cartValueTimeIn ?? 400 })
            moveRightVal.value = withTiming(0, { duration: cartValueTimeIn ?? 400 })
            moveInVal.value = 0
        }
        onChangeHandler(cartCount)
    }, [cartCount])

    return (
        <View style={[{ width: 100, height: 40, backgroundColor: "green", justifyContent: "center", alignItems: "center" }, style]}>
            <Animated.View style={[pressBtnStyle]}>
                <TouchableOpacity onPressIn={onBtnPressed}><Text style={{ color: textColor ?? "white", padding: 10 }}>{`Add to cart` ?? cartText}</Text></TouchableOpacity>
            </Animated.View>
            <Animated.View style={[afterPressStyle, { flexDirection: "row", justifyContent: "center", alignItems: "center" }]}>
                <Animated.View style={[movingLeftStyle]}>
                    <Icon color={textColor ?? "white"} onPress={() => handleCount(1)} name='plus' />
                </Animated.View>
                <Animated.View style={[movingInStyle]}>
                    <Text style={{ color: textColor ?? "white" }}>{cartCount}</Text>
                </Animated.View>
                <Animated.View style={[movingRightStyle]}>
                    <Icon color={textColor ?? "white"} onPress={() => handleCount(-1)} name='minus' />
                </Animated.View>
            </Animated.View>
        </View>
    )
}

export default CartButton