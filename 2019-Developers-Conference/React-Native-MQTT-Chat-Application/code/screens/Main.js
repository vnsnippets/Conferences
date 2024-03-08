/**
 * Author: Vidush H. Namah (2019)
 * 
 * Main Screen - currently default template with no purpose
*/

import React from 'react';
import { StyleSheet, ScrollView, View, Text, Alert, ListView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { connect } from 'react-redux';
import moment from 'moment';

import { SearchBox } from '../components/SearchBox';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { Divider } from '../components/Divider';
import * as ACTIONS from '../reducers/Actions';

const ICON_SIZE = 20;
const DATASOURCE = new ListView.DataSource({ rowHasChanged: (R1, R2) => R1 !== R2 });

const SORT_HANDLER = (A, B) => {
    A = new Date(A.Start);
    B = new Date(B.Start);

    if (A < B) { return -1; }
    if (A > B) { return 1; }
    return 0;
}

export class MainUI extends React.Component {
    constructor() {
        super();
        this.state = {
            Search: "",
            Sessions: []
        }
    }

    FilterSessions = (sessions = this.props.Sessions) => {
        if (this.state.Search && this.state.Search == "") {
            console.log("[FILTER] No search criteria.");
            return sessions;
        }

        return sessions.filter(e => e.Title.toUpperCase().includes(this.state.Search.toUpperCase()));
    }

    HandleSearch = (value) => {
        this.setState({ ...this.state, Search: value });
        model = {
            Search: value
        }

        this.FilterSessions(this.props.Sessions);
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

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={STYLES.wrapper}>
                <ListView style={STYLES.list}
                    enableEmptySections={true}
                    dataSource={DATASOURCE.cloneWithRows(this.FilterSessions(this.props.Sessions))}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    refreshControl={
                        <RefreshControl progressViewOffset={60}
                            refreshing={this.props.Loading} onRefresh={this.props.RefreshData} />
                    }
                    renderRow={(data) =>
                        <TouchableOpacity onPress={() => navigate('Chat', { Session: data })}>
                            <View style={STYLES.row}>
                                <View style={STYLES.dataSet}>
                                    <Text style={STYLES.time}>{moment.utc(new Date(data.Start)).format("DD-MM-YYYY HH:mm")}</Text>
                                    <Text style={STYLES.data} textBreakStrategy="balanced">{data.Title.toUpperCase()}</Text>
                                </View>
                                <Icon style={STYLES.icon} name="md-arrow-forward" size={ICON_SIZE} color={Colors.Theme.Light}></Icon>
                            </View>
                        </TouchableOpacity>

                    }
                    renderHeader={() =>
                        <View>
                            <View style={STYLES.header}>
                                <View style={STYLES.headerOption}>
                                    <View style={[STYLES.status, (this.props.Connected) ? ((this.props.Loading) ? STYLES.loading : STYLES.connected) : (STYLES.disconnected)]}></View>
                                    <Text style={STYLES.statusText}>
                                        {(this.props.Connected) ? ((this.props.Loading) ? "REFRESHING" : "CONNECTED") : ("DISCONNECTED")}
                                    </Text>
                                </View>
                            </View>
                            <View style={STYLES.panel}>
                                <Text style={STYLES.title} textBreakStrategy="simple">DEVELOPERS' CONFERENCE 2019</Text>
                                <Text style={STYLES.footnote}>AN APPLICATION BY VIDUSH H. NAMAH</Text>
                            </View>

                            <SearchBox
                                style={{ marginBottom: 10, borderWidth: 1, borderColor: Colors.Theme.Default, backgroundColor: Colors.Theme.Transparent }}
                                color={Colors.Theme.Light}
                                placeholder="SEARCH BY SESSION TITLE"
                                HandleInputChange={(e) => this.HandleSearch(e)}
                                HandleInputSubmit={(e) => this.HandleSearch(e)} />
                        </View>
                    } />
            </View>
        );
    }
}

const STYLES = StyleSheet.create({
    icon: {
        margin: 15
    },
    time: {
        fontSize: 11,
        marginBottom: 5,
        color: Colors.Theme.Light
    },
    row: {
        padding: 0,
        borderWidth: 1,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: Colors.Theme.Default
    },
    dataSet: {
        flex: 1,
        margin: 15
    },
    data: {
        lineHeight: 20,
        color: Colors.Theme.Light
    },
    footnote: {
        textAlign: "center",
        fontSize: 12,
        color: Colors.Theme.Light
    },
    wrapper: {
        flex: 1,
        backgroundColor: Colors.Theme.Background,
        padding: 15
    },
    container: {
        flex: 1,
        backgroundColor: Colors.Theme.Background,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15
    },
    panel: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 15,
        paddingTop: 40
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
        paddingTop: 20
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
    Sessions: store.State.Sessions.sort(SORT_HANDLER),
    Loading: store.State.Loading,
    Connected: store.State.Connected,
    Error: store.State.Error
});

const mapActionsToProps = (dispatch) => ({
    RefreshData: () => dispatch(ACTIONS.MAIN.AsyncFetchSessions()),
});

export default Main = connect(mapStateToProps, mapActionsToProps)(MainUI);