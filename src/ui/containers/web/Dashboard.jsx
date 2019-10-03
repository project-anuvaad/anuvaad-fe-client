import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import APITransport from '../../../flux/actions/apitransport/apitransport';

class Dashboard extends React.Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login,
    apistatus: state.apistatus
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport
}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
