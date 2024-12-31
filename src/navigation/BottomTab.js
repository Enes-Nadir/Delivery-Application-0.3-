import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { COLOURS } from '../global/styles';
import { icons } from '../constants';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Svg, { Path } from 'react-native-svg';
import { isIphoneX } from 'react-native-iphone-x-helper';

const Tabs = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
    const isSelected = accessibilityState.selected;

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: COLOURS.white }}></View>
                    <Svg width={75} height={61} viewBox="0 0 75 61">
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLOURS.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: COLOURS.white }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLOURS.white,
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <TouchableOpacity
            style={{
                flex: 1,
                height: 60,
                backgroundColor: COLOURS.white,
            }}
            activeOpacity={1}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    );
};

const CustomTabBar = (props) => {
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLOURS.white,
                    }}
                />
                <BottomTabBar {...props.props} />
            </View>
        );
    }
    return <BottomTabBar {...props.props} />;
};

const BottomTabs = () => {

    const [cartItems, setCartItems] = useState([]);

    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: '#EDE8DC',
                    borderTopColor: '#EDE8DC',
                },
            }}
            tabBar={(props) => <CustomTabBar props={props} />}
        >
        <Tabs.Screen
        name="Home"
        component={HomeScreen} // Use component prop instead of children
        initialParams={{ cartItems, setCartItems }} // Pass initial params if needed
        options={{
            tabBarIcon: ({ focused }) => (
            <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLOURS.primary : COLOURS.secondary,
                }}
            />
            ),
            tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
        />
        <Tabs.Screen
        name="Cart"
        component={CartScreen}
        initialParams={{ cartItems, setCartItems }}
        options={{
            tabBarIcon: ({ focused }) => (
            <View>
                <Image
                source={icons.basket}
                resizeMode="contain"
                style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? COLOURS.primary : COLOURS.secondary,
                }}
                />
                {cartItems?.length > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartItems.length}</Text>
                </View>
                )}
            </View>
            ),
            tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
        />
            <Tabs.Screen
                name="User"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLOURS.primary : COLOURS.secondary,
                            }}
                        />
                    ),
                    tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />
        </Tabs.Navigator>
    );
};

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: -5,
        right: -10,
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default BottomTabs;
