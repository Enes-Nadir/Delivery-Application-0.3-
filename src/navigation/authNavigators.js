import React from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import SignInScreen from '../screens/authScreens/SignInScreen'
import SignUpScreen from '../screens/authScreens/SignUpScreen';
import BottomTabs from './BottomTab';
import Details from '../screens/Details';
import CartScreen from '../screens/CartScreen';
import AddressScreen from '../screens/Profile/AddressScreeen';
import PaymentScreen from '../screens/Profile/CardField';
import PrivacyPolicyScreen from '../screens/Profile/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../screens/Profile/TermsOfServiceScreen';


const Auth = createStackNavigator();

export default function AuthStack(){
    return(
        <Auth.Navigator>
            <Auth.Screen 
                name ="SignInScreen"
                component ={SignInScreen}
                options = {{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

            <Auth.Screen 
                name ="SignUpScreen"
                component ={SignUpScreen}
                options = {{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

            <Auth.Screen 
                name ="BottomTabs"
                component ={BottomTabs}
                options = {{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />
            <Auth.Screen 
                name ="details"
                component ={Details}
                options = {{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />
            {/*Profile Screens */}
            <Auth.Screen 
                name="AddressScreen" 
                component={AddressScreen} 
                options={{
                    title: 'Address',
                    headerShown: false,
                }}
            />
            {/* <Auth.Screen 
                name="PaymentScreen" 
                component={PaymentScreen} 
                options={{
                    title: 'Address',
                    headerShown: false,
                }}
            /> */}
            <Auth.Screen 
                name="PrivacyPolicyScreen" 
                component={PrivacyPolicyScreen} 
                options={{ headerShown: false }}
                />
                <Auth.Screen 
                name="TermsOfServiceScreen" 
                component={TermsOfServiceScreen} 
                options={{ headerShown: false }}
            />


        </Auth.Navigator>
    )
}