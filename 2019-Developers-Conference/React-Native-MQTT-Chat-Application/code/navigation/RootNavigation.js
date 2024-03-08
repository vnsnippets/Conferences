/**
 * Author: Vidush H. Namah (2019)
 * 
 * Creates Navigation Stack for the entire application
 * All screens supporting navigation should be linked via
 * a key here.
 */

import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Main from '../screens/Main';
import Chat from '../screens/Chat';

const IMGHeaderBG = require('../../assets/images/headerbg.png');
const IMGBackBTN = require('../../assets/images/icons/back.png');
const IMGLogoutBTN = require('../../assets/images/icons/logout-light.png')

const NavigationStack = createStackNavigator(
    {
        Main: {
            screen: Main,
            navigationOptions: ({ navigation }) => ({ header: null })
        },
        Chat: {
            screen: Chat,
            navigationOptions: ({ navigation }) => ({

            })
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                title: "DEVELOPED BY VIDUSH H. NAMAH",
                titleStyle: {
                    fontSize: 14,
                    fontFamily: Fonts.PrimaryLight
                },
                headerStyle: {
                    backgroundColor: Colors.Theme.Background,
                    borderBottomWidth: 0,        
                    elevation: 0, // ANDROID: Remove shadow
                    shadowOpacity: 0, // IOS: Remove shadow
                },
                headerBackground: null,
                headerTitleStyle: {
                    fontSize: 12,
                    fontFamily: Fonts.PrimaryLight,
                    flex: 1,
                    textAlign: "right"
                },
                headerTintColor: Colors.Theme.Light,
                headerLeft: 
                    <TouchableOpacity onPress={() => navigation.goBack()} style={STYLES.HeaderOption}>
                        <Icon name="md-arrow-back" size={20} color={Colors.Theme.Light} />
                    </TouchableOpacity>
            }
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const width = layout.initWidth;
                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [width, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateX }] };
            },
        })
    }
);

const STYLES = StyleSheet.create({
    Header: {
        flex: 1
    },
    HeaderOption: {
        paddingLeft:20,
        paddingRight:20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});

export default RootNavigation = createAppContainer(NavigationStack);