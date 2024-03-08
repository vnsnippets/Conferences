import React from 'react';
import { StatusBar, StyleSheet, Text, View, UIManager } from 'react-native';
import { AppLoading, Font } from 'expo';
import { Provider } from 'react-redux';

import Store from './code/reducers/Store';
import Colors from './code/constants/Colors';
import BaseNavigation from './code/navigation/BaseNavigation';
import MQTT from './code/service/MQTT';
import * as ACTIONS from './code/reducers/Actions';

export default class App extends React.Component {
    state = {
        LoadingComplete: false
    };

    componentWillMount = () => {
        MQTT.Initialize(Store);
        Store.dispatch(ACTIONS.MAIN.AsyncApplicationStart());
    }

    componentDidMount = () => {
        console.disableYellowBox = true;
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    LoadResourcesAsync = async () => Promise.all([
        Font.loadAsync({
            'ubuntu-regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
            'ubuntu-bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
            'ubuntu-medium': require('./assets/fonts/Ubuntu-Medium.ttf'),
            'ubuntu-light': require('./assets/fonts/Ubuntu-Light.ttf'),
        })
    ]);

    HandleLoadingError = (error) => {
        console.warn(error);
    };

    HandleFinishLoading = () => {
        this.setState({ LoadingComplete: true });
    }

    render = () => {
        if (!this.state.LoadingComplete) {
            return (
                <AppLoading
                    startAsync={this.LoadResourcesAsync}
                    onError={this.HandleLoadingError}
                    onFinish={this.HandleFinishLoading}
                />
            );
        }
        return (
            <Provider store={Store}>
                <View style={STYLES.container}>
                    <StatusBar barStyle='light-content' backgroundColor={Colors.Theme.StatusBar} />
                    <BaseNavigation />
                </View>
            </Provider>
        );
    }
}

const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Theme.Background
    }
});
