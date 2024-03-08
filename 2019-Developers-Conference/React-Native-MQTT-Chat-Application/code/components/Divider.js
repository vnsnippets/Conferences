/**
 * Author: Vidush H. Namah (2019)
 * 
 * Divider - Horizontal colored line
*/

import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export const Divider = (props) => (
    <View style={[
        STYLES.border,
        props.thickness && { borderBottomWidth: props.thickness },
        props.color && { borderColor: props.color },
        props.offset && { marginLeft: props.offset, marginRight: props.offset }
    ]}>
    </View>
)

const STYLES = StyleSheet.create({
    border: {
        borderBottomWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0
    }
})
