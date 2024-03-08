/**
 * Author: Vidush H. Namah (2019)
 * 
 * Component :  Search Box
 */

import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

const COLOR_BACKGROUND = "#FAFAFAAA";
const COLOR_DEFAULT = "#7D7B7C";
const COLOR_DARK = "#222222";

export class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    HandleInput = (value) => {
        this.setState({ value });
        this.props.HandleInputChange(value);
    }

    HandleSubmit = (value) => {
        this.setState({ value });
        this.props.HandleInputSubmit(value);
    }

    RenderIcon = (color=COLOR_DEFAULT) => {
        if (this.state.value && this.state.value != "") 
            return <Icon name="md-close" size={24} color={color}></Icon>
        else
            return <Icon name="md-search" size={24} color={color}></Icon>
    }

    render() {
        return (
            <KeyboardAvoidingView style={[STYLES.container, this.props.style]}>
                <TextInput style={[STYLES.search, this.props.color && { color: this.props.color }]} 
                    value={this.state.value}
                    placeholderTextColor={this.props.color}
                    onChangeText={(e) => this.HandleInput(e)}
                    onSubmitEditing={(e) => this.HandleSubmit(e)}
                    placeholder={this.props.placeholder} placeholderTextColor={COLOR_DEFAULT} />
                <TouchableOpacity style={[STYLES.option]} onPress={() => this.setState({ value: "" })}>
                    <View>
                        { this.RenderIcon(COLOR_DEFAULT) }
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    };
};

const STYLES = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "stretch",
        flexDirection: "row",
        backgroundColor: COLOR_BACKGROUND,
        paddingLeft: 15,
        borderRadius: 5
    },
    search: {
        flex: 1,
        borderColor: COLOR_DEFAULT,
        borderRadius: 5,
        justifyContent: "center",
        color: COLOR_DARK
    },
    option: {
        paddingTop: 7.5,
        paddingBottom: 7.5,
        paddingLeft: 15,
        paddingRight: 10,
    }
});