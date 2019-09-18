import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserAuth from "../../../flux/actions/apis/userprofile";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";

class Callback extends React.Component {

    componentDidMount() {
        let hash = this.props.location.hash.split('&')

        hash.map((h) => {
            if (h.indexOf('access_token') > 0) {
                localStorage.setItem('token', h.split('access_token=')[1])
                let api = new UserAuth()
                this.props.APITransport(api);
                // history.push(`${process.env.PUBLIC_URL}/corpus`)
            }
            else if (h.indexOf('error') > 0) {
                localStorage.removeItem('token')
                history.push(`${process.env.PUBLIC_URL}/logout`)
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userProfile !== this.props.userProfile) {
            if (this.props.userProfile.isActive) {
                localStorage.setItem('userDetails', this.props.userProfile.firstname + ' ' + this.props.userProfile.lastname)
                localStorage.setItem('userProfile', JSON.stringify(this.props.userProfile))
                history.push("/viewtranslate")
            }
        }
    }

    render() {
        return (
            <div>Redirecting Please wait..</div>
        );
    }
}


const mapStateToProps = state => ({
    apistatus: state.apistatus,
    userProfile: state.userProfile
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            APITransport
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((Callback));
