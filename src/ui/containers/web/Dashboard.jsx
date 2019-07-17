import React from 'react';
import { cyan600, pink600, purple600, orange600 } from 'material-ui/styles/colors';

import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';

import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfoBox from '../../components/web/dashboard/InfoBox';
import NewOrders from '../../components/web/dashboard/NewOrders';
import MonthlySales from '../../components/web/dashboard/MonthlySales';
import BrowserUsage from '../../components/web/dashboard/BrowserUsage';
import RecentlyProducts from '../../components/web/dashboard/RecentlyProducts';
import Data from '../../../assets/data';


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
