/**
 * Author: Vidush H. Namah (2019)
 * 
 * Main Screen - currently default template with no purpose
*/

import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    Text,
    Alert,
    ScrollView,
    TextInput,
    TouchableNativeFeedback
} from 'react-native';

import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { Divider } from '../components/Divider';

import * as ACTIONS from '../reducers/Actions';

const ICON_SIZE = 20;

export class UI extends React.Component {
    constructor() {
        super();
        this.state = {
            Value: "",
            Valid: false
        }
    }

    componentDidUpdate = () => {
        if (this.props.Error) {
            Alert.alert(
                this.props.Error.Title,
                this.props.Error.Message,
                [
                    {
                        text: 'TRY AGAIN', onPress: () => {
                            console.log('[MAIN] ERROR : TRY AGAIN.')
                            this.props.RefreshData();
                        }
                    },
                    {
                        text: 'CANCEL',
                        onPress: () => console.log('[MAIN] ERROR DISMISSED.'),
                        style: 'cancel',
                    }
                ],
                { cancelable: true },
            );
        };
    }

    HandleInput = (e) => {
        if (e && e != "")
            this.setState({ Value: e, Valid: true });
        else this.setState({ Value: e, Valid: false });
    }

    render() {
        return (
            <View style={STYLES.wrapper}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <KeyboardAvoidingView style={STYLES.container} behavior="padding" enabled>
                        <View style={STYLES.status}>
                            <View style={[STYLES.statusIndicator, (this.props.Connected) ? ((this.props.Loading) ? STYLES.loading : STYLES.connected) : (STYLES.disconnected)]}></View>
                            <Text style={STYLES.statusText}>
                                {(this.props.Connected) ? ((this.props.Loading) ? "REFRESHING" : "CONNECTED") : ("DISCONNECTED")}
                            </Text>
                        </View>
                        <View>
                            <Text style={STYLES.title} textBreakStrategy="simple">DEVELOPERS' CONFERENCE 2019</Text>
                            <Text style={STYLES.footnote}>
                                DISCLAIMER
                            </Text>
                            <Text style={STYLES.footnote}>
                                
                            </Text>
                            <Text style={STYLES.footnote}>AN APPLICATION BY VIDUSH H. NAMAH</Text>
                        </View>
                        <View>
                            <TextInput style={STYLES.input} placeholder="ENTER A USERNAME"
                                value={this.state.Value} onChangeText={(e) => this.HandleInput(e)} />
                        </View>
                        <TouchableNativeFeedback disabled={!this.state.Valid} 
                            onPress={() => {if (this.state.Valid) this.props.SaveIdentity(this.state.Value)}} useForeground={true}>
                            <View style={[STYLES.continue, !this.state.Valid && {backgroundColor: Colors.Theme.Default}]}>
                                <Text style={{ color: Colors.Theme.Light, fontFamily: Fonts.Primary }}>CONTINUE</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}

const STYLES = StyleSheet.create({
    continue: {
        backgroundColor: Colors.Theme.Success,
        alignItems: "center",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10
    },
    input: {
        marginTop: 15,
        borderColor: Colors.Theme.Default,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        color: Colors.Theme.Light,
        marginBottom: 10,
        textAlign: "center"
    },
    footnote: {
        textAlign: "center",
        fontSize: 12,
        color: Colors.Theme.Light
    },
    wrapper: {
        flex: 1,
        backgroundColor: Colors.Theme.Background,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        padding: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontFamily: Fonts.Primary,
        fontSize: 28,
        color: Colors.Theme.Text.Light,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 25,
        textAlign: "center",
        lineHeight: 36
    },
    header: {
        flex: 1
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    statusIndicator: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: Colors.Theme.Default,
        marginRight: 5
    },
    statusText: {
        color: Colors.Theme.Text.Default,
        fontFamily: Fonts.PrimaryLight,
        fontSize: 12
    },
    connected: {
        backgroundColor: Colors.Theme.Success,
        borderWidth: 0
    },
    disconnected: {
        backgroundColor: Colors.Theme.Danger,
        borderWidth: 0
    },
    loading: {
        backgroundColor: Colors.Theme.Warning,
        borderWidth: 0
    }
});

const mapStateToProps = (store) => ({
    Loading: store.State.Loading,
    Connected: store.State.Connected,
    Error: store.State.Error
});

const mapActionsToProps = (dispatch) => ({
    SaveIdentity: (user) => dispatch(ACTIONS.MAIN.ActionSaveUser(user))
});

export default Identity = connect(mapStateToProps, mapActionsToProps)(UI);