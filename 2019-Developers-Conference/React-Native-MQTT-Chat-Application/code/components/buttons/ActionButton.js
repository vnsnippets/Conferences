/**
 * Author: Vidush H. Namah (2019)
 * 
 * Customized Action Button
 */

import React from 'react';
import { LinearGradient } from 'expo';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export default ActionButton = (props) => {
    let icon = undefined;
    if (props.icon) {
        icon = <Image resizeMode="contain" source={props.icon} style={STYLES.icon} />
    }

    // BUILDING BUTTON INTERIOR
    const content = (
        <View
            style={[
                STYLES.button,
                STYLES.action,
                props.border && { borderWidth: 1, borderColor: props.border, borderRadius: 100 },
                props.background && { backgroundColor: props.background },
                props.diameter && { width: props.diameter, height: props.diameter }
            ]}
        >
            { icon && (<View>{ icon }</View>) }
            { props.children && props.children }
        </View>
    );

    const caption = (
        <Text style={[STYLES.caption, props.color && { color: props.color }]}>{ props.caption && props.caption }</Text>
    )
    // BUILDING BUTTON INTERIOR

    return(
        <TouchableOpacity
            accessibilityTraits = "button"
            onPress = {props.action}
            activeOpacity={0.75}
            style={[
                STYLES.center,
                props.style
            ]}
        >
            { content }
            { props.caption && caption }
        </TouchableOpacity>
    )
}

const HEIGHT = 40;

const STYLES = StyleSheet.create({
    container: {
        height: HEIGHT
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    action: {
        borderRadius: 100,
        height: HEIGHT,
        width: HEIGHT,
        paddingHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        maxHeight: HEIGHT - 20,
        maxWidth: HEIGHT - 20
    },
    caption: {
        fontSize: 11,
        fontFamily: Fonts.Primary,
        marginTop: 7.5
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})