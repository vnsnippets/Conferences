/**
 * Author: Vidush H. Namah (2019)
 * 
 * Main Screen - currently default template with no purpose
*/

import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Alert,
    FlatList,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard,
    ScrollView
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { connect } from 'react-redux';
import moment from 'moment';
import { Guid } from 'guid-typescript';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { Divider } from '../components/Divider';
import * as ACTIONS from '../reducers/Actions';

const ICON_SIZE = 20;

const SORT_HANDLER = (A, B) => {
    A = new Date(A.Timestamp);
    B = new Date(B.Timestamp);

    if (A < B) { return -1; }
    if (A > B) { return 1; }
    return 0;
}

export class ChatUI extends React.Component {
    constructor() {
        super();
        this.state = {
            Session: null,
            Value: ""
        }

        this.Dataset = null
    }

    HandleInput = (value) => {
        this.setState({ Value: value });
    }

    HandleSend = () => {
        if (this.state.Value && this.state.Value != "") {
            model = {
                Topic: this.state.Session.Id,
                UserId: this.props.Identity.Id,
                User: this.props.Identity.Name,
                Message: this.state.Value,
                Timestamp: new Date(),
                Id: Guid.create().toString()
            }

            this.props.SendMessage(model);
        }

        this.setState({ Value: "" });
    }

    componentWillMount = () => {
        session = this.props.navigation.getParam('Session', null);
        console.log(session);
        this.setState({ Session: session });

        // Subscribe to MQTT
        // this.props.Subscribe(session.Id);
    }

    componentDidMount = () => {

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
                            this.props.StartMQTT();
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
            this.props.HandleError();
        };
    }

    RenderChatBubble = ({item}) => (
        <View style={STYLES.chat}>
            <Text style={[STYLES.time, (item.UserId == this.props.Identity.Id) ? {textAlign:"right"} : null]}>{item.User.toUpperCase()} {moment(new Date(item.Timestamp)).format("DD-MM-YYYY hh:mm:ss")}</Text>
            <View style={[STYLES.bubble, (item.UserId == this.props.Identity.Id) ? {backgroundColor:Colors.Theme.Light} : null]}>
                <Text style={[STYLES.data, (item.UserId == this.props.Identity.Id) ? {color:Colors.Theme.Background,textAlign:"right"} : null]}>{item.Message}</Text>
            </View>
        </View>
        
    );

    render() {
        const DataSet = this.props.Messages.sort(SORT_HANDLER).filter((e) => (e.Topic == this.state.Session.Id)).reverse();
        return (
            <View style={STYLES.wrapper}>
                <KeyboardAvoidingView style={STYLES.container} behavior="position" keyboardVerticalOffset={95}>
                        <FlatList
                            inverted={true}
                            style={STYLES.list}
                            data={DataSet}
                            extraData={this.props.Refresh}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => item.Id}
                            renderItem={this.RenderChatBubble}
                            ListFooterComponent={() =>
                                <View>
                                    <View style={STYLES.panel}>
                                        <Text style={STYLES.title} textBreakStrategy="simple">{this.state.Session.Title.toUpperCase()}</Text>
                                        {
                                            this.state.Session && this.state.Session.Description &&
                                            <Text style={STYLES.content} textBreakStrategy="simple">{this.state.Session.Description}</Text>
                                        }
                                    </View>
                                </View>
                            }>
                        </FlatList>
                    {/* </ScrollView> */}
                    <View style={STYLES.bottom}>
                        <View style={STYLES.messenger}>
                            <View style={{ justifyContent: "center", flex: 1 }}>
                                <TextInput style={STYLES.input} placeholder="ENTER A MESSAGE"
                                    value={this.state.Value} onChangeText={(e) => this.HandleInput(e)}
                                    onSubmitEditing={() => this.HandleSend()}/>
                            </View>
                            
                            <TouchableOpacity style={{padding:5}} onPress={() => this.HandleSend()}>
                                <Icon name="md-send" size={20} color={Colors.Theme.Light} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const STYLES = StyleSheet.create({
    list: {
        marginBottom:60,
        paddingLeft: 15,
        paddingRight: 15
    },
    data: {
        fontFamily: Fonts.Primary,
        color: Colors.Theme.Light
    },
    chat: {
        marginBottom: 15
    },
    bubble: {
        backgroundColor: Colors.Theme.Default,
        borderRadius: 10,
        padding: 10
    },
    input: {
        fontFamily: Fonts.Primary,
        paddingTop: 5,
        paddingBottom: 5,
        color: Colors.Theme.Light
    },
    time: {
        fontFamily: Fonts.PrimaryLight,
        fontSize: 11,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        color: Colors.Theme.Light,
    },
    bottom: {
        backgroundColor: Colors.Theme.Background,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15
    },
    messenger: {
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: Colors.Theme.Default,
        paddingLeft: 10,
        paddingRight: 5,
        borderRadius: 10
    },
    container: {
        flex: 1,
        justifyContent: "flex-end"
    },
    content: {
        lineHeight: 20,
        color: Colors.Theme.Light,
        textAlign: "center",
        marginBottom: 5
    },
    footnote: {
        textAlign: "center",
        fontSize: 12,
        color: Colors.Theme.Light
    },
    wrapper: {
        flex: 1,
        backgroundColor: Colors.Theme.Background
    },
    panel: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10
    },
    title: {
        fontFamily: Fonts.Primary,
        fontSize: 28,
        color: Colors.Theme.Text.Light,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 25,
        textAlign: "center",
        flex: 1,
        flexWrap: "wrap"
    },
    room: {
        marginTop: 20,
        marginBottom: 20
    },
    header: {
        flex: 1,
        paddingTop: 35
    },
    headerOption: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    status: {
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
    Identity: store.State.Identity,
    Messages: store.State.Messages,
    Loading: store.State.Loading,
    Connected: store.State.Connected,
    Error: store.State.Error,
    Refresh: store.State.Refresh
});

const mapActionsToProps = (dispatch) => ({
    Subscribe: (topic) => dispatch(ACTIONS.MAIN.AsyncSubscribeTopic(topic)),
    SendMessage: (model) => dispatch(ACTIONS.MAIN.AsyncSendMessage(model)),
    GetMessagesForTopic: (topic) => dispatch(ACTIONS.MAIN.AsyncFetchMessages(topic)),
    StartMQTT: () => dispatch(ACTIONS.MAIN.AsyncStartMQTT()),
    HandleError: () => dispatch(ACTIONS.MAIN.ActionHandleError())
});

export default Chat = connect(mapStateToProps, mapActionsToProps)(ChatUI);