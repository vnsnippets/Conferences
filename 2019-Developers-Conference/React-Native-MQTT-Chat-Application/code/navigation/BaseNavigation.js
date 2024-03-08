import React from 'react';
import { connect } from 'react-redux';
import RootNavigation from './RootNavigation';
import Identity from '../screens/Identity';

const Navigation = ({ dispatch, navigation, state }) => {
    if (state)
        return <RootNavigation />

    return <Identity />
}

const MapStateToProps = (store) => ({
    state: store.State.Identity
});

const MapActionsToProps = (dispatch) => ({

});

export default BaseNavigation = connect(MapStateToProps, MapActionsToProps)(Navigation);